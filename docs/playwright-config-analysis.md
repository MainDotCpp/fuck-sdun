# Playwright 配置选项分析

## 1. 文档研究结果

根据 [Playwright 配置文档](https://playwright.dev/docs/test-use-options)，Playwright 支持以下配置选项：

### 基本选项
- `baseURL`: 基础 URL
- `storageState`: 存储状态

### 模拟选项
- `colorScheme`: 颜色方案（light/dark）
- `geolocation`: 地理位置
- `locale`: 语言环境
- `permissions`: 权限列表
- `timezoneId`: 时区
- `viewport`: 视口大小

### 网络选项
- `acceptDownloads`: 是否自动下载
- `extraHTTPHeaders`: 额外的 HTTP 头
- `httpCredentials`: HTTP 认证凭据
- `ignoreHTTPSErrors`: 是否忽略 HTTPS 错误
- `offline`: 是否离线模式
- `proxy`: 代理设置

### 其他选项
- `userAgent`: **支持** ✅
- `userAgentMetadata`: **不支持** ❌

## 2. 关键发现

### 文档说明

文档中提到：

> **More browser and context options**
> 
> Any options accepted by `browserType.launch()`, `browser.newContext()` or `browserType.connect()` can be put into `launchOptions`, `contextOptions` or `connectOptions` respectively in the `use` section.

这意味着可以通过 `contextOptions` 传递任何 `browser.newContext()` 接受的选项。

### 实际测试结果

**测试方案 1: contextOptions**
```typescript
const context1 = await browser.newContext({
  userAgent: browserSpec.userAgent,
  userAgentMetadata: userAgentMetadata,  // ❌ 不支持
  // ...
});
```

**结果**: `userAgentData` 为 `null` ❌

**测试方案 2: CDP**
```typescript
const cdpResult = await cdpSession.send('Emulation.setUserAgentOverride', {
  userAgent: browserSpec.userAgent,
  userAgentMetadata: userAgentMetadata
});
```

**结果**: CDP 命令执行成功（返回 `{}`），但 `userAgentData` 仍为 `null` ❌

## 3. 结论

### Playwright 不支持 `userAgentMetadata`

1. **API 层面不支持**:
   - `browser.newContext()` 不接受 `userAgentMetadata` 选项
   - 即使通过 `@ts-ignore` 强制传递，Playwright 也会忽略它

2. **CDP 层面有限支持**:
   - `Emulation.setUserAgentOverride` CDP 命令可以执行
   - 但 `userAgentMetadata` 参数可能不被 Playwright 的 CDP 实现正确处理
   - 或者需要在特定时机/条件下设置才能生效

3. **文档中没有提及**:
   - Playwright 官方文档中没有提到 `userAgentMetadata` 选项
   - 只提到了 `userAgent` 选项

## 4. 可能的原因

### 为什么 Playwright 不支持 `userAgentMetadata`？

1. **API 设计决策**:
   - `userAgentMetadata` 是较新的 Web API（Client Hints API）
   - Playwright 可能认为通过 JavaScript 注入更灵活
   - 或者认为这个功能使用场景较少

2. **实现复杂度**:
   - `userAgentMetadata` 需要在浏览器引擎层面设置
   - 不同浏览器（Chromium、Firefox、WebKit）的实现可能不同
   - Playwright 可能不想维护这个复杂性

3. **版本限制**:
   - 当前使用的 Playwright 版本是 1.56.1
   - 可能未来版本会支持，但目前不支持

## 5. 解决方案

### 当前最佳方案：JavaScript 注入

由于 Playwright 不支持 `userAgentMetadata`，当前最佳方案是：

1. **使用 `addInitScript`**:
   - 在页面加载前注入 JavaScript
   - 使用 `Object.defineProperty` 设置 `navigator.userAgentData`
   - 优化 `toString` 方法返回 `[native code]`

2. **优化检测规避**:
   - 拦截 `Object.getOwnPropertyDescriptor` 隐藏 `configurable: true`
   - 使用 `Function` 构造函数创建函数，避免暴露 `Promise.resolve`
   - 修改 `toString` 返回 `[native code]`

### 未来可能的方案

1. **等待 Playwright 更新**:
   - 关注 Playwright 的更新日志
   - 如果未来版本支持 `userAgentMetadata`，可以切换到原生方案

2. **提交 Feature Request**:
   - 向 Playwright 团队提交功能请求
   - 说明使用场景和需求

3. **使用其他工具**:
   - 如果 Playwright 长期不支持，可以考虑其他浏览器自动化工具
   - 但 Playwright 在其他方面有优势，需要权衡

## 6. 测试代码

测试代码位于 `tools/test-context-options.ts`，测试了两种方案：

1. **方案 1**: 通过 `contextOptions` 设置 `userAgentMetadata`（失败）
2. **方案 2**: 通过 CDP 设置 `userAgentMetadata`（失败）

两种方案都失败了，证实了 Playwright 目前不支持 `userAgentMetadata`。

## 7. 参考链接

- [Playwright 配置文档](https://playwright.dev/docs/test-use-options)
- [Playwright BrowserContext API](https://playwright.dev/docs/api/class-browsercontext)
- [Chrome DevTools Protocol - Emulation.setUserAgentOverride](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setUserAgentOverride)

