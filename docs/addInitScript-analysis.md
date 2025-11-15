# addInitScript 方案分析

## 1. 当前实现状态

### 已经在使用 addInitScript

**当前代码流程**：
```typescript
// src/injectors/fingerprint-injector.ts
await context.addInitScript(script);  // 已经在使用

// src/strategies/android-strategy.ts
// 脚本中包含 userAgentData 的设置逻辑
Object.defineProperty(navigator, 'userAgentData', { ... });
```

**执行时机**：
- `addInitScript` 在页面加载前执行
- 在所有页面 JavaScript 代码运行之前
- 在 DOMContentLoaded 事件之前

## 2. addInitScript 的执行时机分析

### Playwright 的执行顺序

```
1. BrowserContext 创建
2. CDP 设置（如果使用）← 当前尝试但失败
3. addInitScript 注册脚本
4. Page 创建
5. 页面导航开始
6. addInitScript 脚本执行 ← 当前方案
7. 页面 JavaScript 执行
8. DOMContentLoaded 事件
```

### 关键优势

**✅ 执行时机优势**：
- `addInitScript` 在页面 JavaScript **之前**执行
- 确保 `userAgentData` 在检测脚本访问前已设置
- 比在页面加载后注入更可靠

## 3. 方案对比

### 方案 1：CDP (Emulation.setUserAgentOverride)

**优点**：
- ✅ 在浏览器引擎层面设置，更底层
- ✅ 理论上更难被检测
- ✅ 不通过 JavaScript 修改

**缺点**：
- ❌ **当前不工作**：Playwright 的 CDP 实现可能不支持 `userAgentMetadata`
- ❌ 需要创建 CDP session，增加复杂性
- ❌ 调试困难
- ❌ 兼容性问题

### 方案 2：addInitScript + Object.defineProperty（当前方案）

**优点**：
- ✅ **已验证可用**
- ✅ 实现简单
- ✅ 执行时机早（页面加载前）
- ✅ 兼容性好
- ✅ 调试方便

**缺点**：
- ⚠️ 可能被检测脚本发现（通过属性描述符检查）
- ⚠️ 使用 JavaScript 修改，不是原生设置

### 方案 3：addInitScript + Proxy（改进方案）

**优点**：
- ✅ 比 `Object.defineProperty` 更隐蔽
- ✅ 可以拦截所有访问，包括检测脚本的检查
- ✅ 执行时机早

**缺点**：
- ⚠️ 仍然可能被检测（Proxy 本身也可能被检测）
- ⚠️ 实现更复杂

## 4. addInitScript 的改进方案

### 方案 A：优化当前 Object.defineProperty 实现

**改进点**：
1. **更早执行**：确保在 `navigator.userAgentData` 被访问前设置
2. **保持属性描述符**：尽量模拟原生属性描述符
3. **避免检测特征**：移除 `configurable: true`（如果可能）

**代码示例**：
```typescript
// 当前实现
Object.defineProperty(navigator, 'userAgentData', {
  get: () => ({ ... }),
  configurable: true,  // ← 可能被检测
  enumerable: true
});

// 改进：尝试使用 configurable: false（但可能失败）
try {
  Object.defineProperty(navigator, 'userAgentData', {
    get: () => ({ ... }),
    configurable: false,  // ← 更接近原生
    enumerable: true
  });
} catch (e) {
  // 如果失败，回退到 configurable: true
}
```

### 方案 B：使用 Proxy 增强隐蔽性

**代码示例**：
```typescript
(function() {
  const uaData = ${JSON.stringify(browser.userAgentData || null)};
  
  // 如果 userAgentData 不存在，创建它
  if (!navigator.userAgentData) {
    const userAgentDataProxy = new Proxy({}, {
      get: function(target, prop) {
        if (prop === 'brands') return uaData.brands;
        if (prop === 'platform') return uaData.platform;
        if (prop === 'mobile') return uaData.mobile;
        if (prop === 'getHighEntropyValues') {
          return function(hints) {
            return Promise.resolve({
              platform: uaData.platform,
              platformVersion: uaData.platformVersion,
              model: uaData.model,
              mobile: uaData.mobile,
              // ... 其他高熵值
            });
          };
        }
        return target[prop];
      },
      has: function(target, prop) {
        return ['brands', 'platform', 'mobile', 'getHighEntropyValues'].includes(prop);
      },
      ownKeys: function(target) {
        return ['brands', 'platform', 'mobile', 'getHighEntropyValues'];
      }
    });
    
    Object.defineProperty(navigator, 'userAgentData', {
      get: () => userAgentDataProxy,
      configurable: false,
      enumerable: true
    });
  }
})();
```

### 方案 C：结合 CDP 和 addInitScript

**策略**：
1. 先尝试 CDP 设置
2. 如果 CDP 失败，使用 `addInitScript` 作为后备
3. 在 `addInitScript` 中检查 CDP 是否成功

**当前实现已经这样做**：
```typescript
// 检查 userAgentData 是否已经存在（CDP 设置成功的情况）
if (navigator.userAgentData) {
  // 验证 CDP 设置的值是否正确
  // 如果匹配，跳过 JavaScript 注入
}
```

## 5. 代价分析

### 使用 addInitScript 的代价

#### 1. 性能代价

**影响**：
- ⚠️ 每个页面加载都会执行脚本
- ⚠️ 脚本大小影响页面加载时间
- ⚠️ 但影响通常很小（< 10ms）

**优化**：
- 脚本应该尽可能精简
- 避免同步阻塞操作
- 使用立即执行函数避免作用域污染

#### 2. 检测风险

**可能被检测的特征**：
1. **属性描述符检查**：
   ```javascript
   // 检测脚本可能检查
   Object.getOwnPropertyDescriptor(navigator, 'userAgentData')
   // 如果 configurable: true，可能被标记为可疑
   ```

2. **函数实现检查**：
   ```javascript
   // 检测脚本可能检查
   navigator.userAgentData.getHighEntropyValues.toString()
   // 如果不是 [native code]，可能被标记
   ```

3. **原型链检查**：
   ```javascript
   // 检测脚本可能检查
   Object.getPrototypeOf(navigator.userAgentData)
   // 如果原型链异常，可能被标记
   ```

4. **时序检查**：
   ```javascript
   // 检测脚本可能在页面加载前检查
   // 如果 userAgentData 在某个时间点突然出现，可能被标记
   ```

#### 3. 兼容性代价

**浏览器兼容性**：
- ✅ Chromium：完全支持
- ✅ WebKit：部分支持（iOS Safari）
- ⚠️ 需要确保脚本在所有目标浏览器中正常工作

#### 4. 维护代价

**代码复杂度**：
- ⚠️ 需要维护 JavaScript 注入脚本
- ⚠️ 需要处理不同浏览器的差异
- ⚠️ 需要定期更新以应对检测脚本的变化

## 6. 优化建议

### 建议 1：优化当前 addInitScript 实现

**改进点**：
1. **移除调试日志**：生产环境不应该有 `console.log`
2. **精简代码**：移除不必要的检查
3. **优化属性描述符**：尽量模拟原生行为

### 建议 2：添加多层防护

**策略**：
1. **第一层**：尝试 CDP（如果未来支持）
2. **第二层**：`addInitScript` + `Object.defineProperty`
3. **第三层**：如果检测到检测脚本，使用更隐蔽的方法

### 建议 3：动态调整策略

**根据检测结果调整**：
- 如果检测脚本存在，使用更隐蔽的方法
- 如果检测脚本不存在，使用简单的方法
- 定期更新策略以应对新的检测方法

## 7. 结论

### addInitScript 是否更好？

**结论**：**是的，addInitScript 是当前最佳方案**

**原因**：
1. ✅ **已验证可用**：当前方案已经成功
2. ✅ **执行时机早**：在页面 JavaScript 之前执行
3. ✅ **实现简单**：代码清晰，易于维护
4. ✅ **兼容性好**：适用于所有 Playwright 支持的浏览器
5. ✅ **稳定性高**：不依赖 CDP 的完整支持

### 代价评估

**性能代价**：**低** ⭐⭐
- 脚本执行时间 < 10ms
- 对页面加载影响很小

**检测风险**：**中等** ⭐⭐⭐
- 可能被属性描述符检查发现
- 但执行时机早，降低了被检测的风险
- 可以通过优化属性描述符进一步降低风险

**维护代价**：**中等** ⭐⭐⭐
- 需要维护 JavaScript 脚本
- 需要应对检测脚本的变化
- 但代码结构清晰，维护成本可控

### 最终建议

1. **继续使用 addInitScript 方案**（当前方案）
2. **优化实现**：
   - 移除调试日志
   - 优化属性描述符
   - 精简代码
3. **保留 CDP 作为备选**：
   - 定期测试 CDP 方案
   - 如果未来 Playwright 支持，可以切换
4. **监控检测结果**：
   - 如果被检测，考虑使用 Proxy 方案
   - 根据实际情况调整策略

