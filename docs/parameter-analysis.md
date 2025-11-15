# iPhone 配置参数分析

## 检测平台收集的参数

根据检测平台的代码分析，以下参数会被检测：

### 1. 关键参数（必须与真实设备一致）

这些参数如果不符合真实设备特征，容易被识别为模拟设备：

#### 硬件相关
- **screenWidth / screenHeight**: 屏幕尺寸，必须与真实 iPhone 型号匹配
  - iPhone 14 Pro: 393x852
  - iPhone 13: 390x844
  - iPhone 12: 390x844
  - 你的配置: 440x956（可能是 iPhone 15 Pro Max 或其他型号）
- **devicePixelRatio**: 设备像素比，必须与屏幕尺寸匹配
  - iPhone 14 Pro: 3
  - iPhone 15 Pro Max: 3
- **hardwareConcurrency**: CPU 核心数，必须与真实设备匹配
  - iPhone 14 Pro: 6
  - iPhone 13: 6
  - 你的配置: 4（可能是 iPhone 12 或更早型号）

#### WebGL 相关（关键指纹）
- **webglRenderer**: WebGL 渲染器，iOS 设备通常是 "Apple GPU"
- **webglVendor**: WebGL 厂商，iOS 设备通常是 "Apple Inc."
- **MAX_TEXTURE_SIZE**: WebGL 最大纹理尺寸（我们设置为 16384）
- **MAX_RENDERBUFFER_SIZE**: WebGL 最大渲染缓冲区（我们设置为 16384）
- **MAX_VARYING_VECTORS**: WebGL 最大变化向量（我们设置为 30）

#### Navigator 相关
- **platform**: 必须是 "iPhone"（iOS 设备）
- **maxTouchPoints**: 触摸点数，iPhone 通常是 5
- **deviceMemory**: iOS 必须是 `undefined`（已正确处理）

#### User-Agent 相关
- **userAgent**: 必须符合 iOS Safari 格式，包含正确的 OS 版本号
- **browser.version**: Safari 版本号，需要与 OS 版本匹配

### 2. 可自定义参数（不影响检测）

这些参数可以自由修改，不会影响检测结果：

#### 系统设置相关
- **timezoneId**: 时区 ID，可以设置为任何时区
  - 例如: "Asia/Shanghai", "America/New_York", "Europe/London"
  - 建议: 根据你的实际需求设置
  
- **language / languages**: 语言设置，可以设置为任何语言
  - 例如: "zh-CN", "en-US", "ja-JP"
  - 建议: 根据你的使用场景设置

#### Canvas/Audio 指纹（噪声种子）
- **canvasNoise**: Canvas 指纹噪声种子，可以是任意 0-1 之间的浮点数
  - 你的配置: 0.041752415
  - 可以修改为: 任何 0-1 之间的值，例如 0.123456789
  
- **audioContextSeed**: AudioContext 指纹种子，可以是任意浮点数
  - 你的配置: 0.4588570074271098
  - 可以修改为: 任何值，例如 0.987654321

#### 网络信息（通常为 unknown/null）
- **connectionType**: 连接类型，iOS 通常为 "unknown"
  - 可以设置为: "unknown", "wifi", "cellular"
  
- **effectiveType**: 有效类型，iOS 通常为 "unknown"
  - 可以设置为: "unknown", "4g", "3g"
  
- **downlink**: 下行速度，iOS 通常为 null
  - 可以设置为: null 或任意数字（如 10）
  
- **rtt**: 往返时间，iOS 通常为 null
  - 可以设置为: null 或任意数字（如 50）

#### 元数据（不影响检测）
- **id**: 设备 ID，仅用于内部标识，不影响检测
- **name**: 设备名称，仅用于显示，不影响检测
- **cpuCores**: CPU 核心数（在代码中未直接使用，但建议与 hardwareConcurrency 一致）
- **browser.name**: 浏览器名称，固定为 "Safari"
- **browser.vendor**: 浏览器厂商，固定为 "Apple Computer, Inc."

### 3. 需要保持一致的参数组合

以下参数需要保持一致性：

1. **屏幕尺寸 + 设备像素比**:
   - 440x956 + 3x DPR = iPhone 15 Pro Max 的特征
   - 如果使用这个尺寸，其他参数也应该匹配 iPhone 15 Pro Max

2. **hardwareConcurrency + cpuCores**:
   - 应该保持一致
   - 你的配置: 4 核心（可能是 iPhone 12 或更早）

3. **OS 版本 + Safari 版本**:
   - iOS 18.7 应该对应 Safari 26.x
   - 你的配置: iOS 18.7 + Safari 26.0.1 ✓（正确）

## 建议的可自定义参数

基于你的配置，以下参数可以安全地自定义：

```json
{
  "system": {
    "timezoneId": "Asia/Shanghai",  // ✅ 可改为任何时区
    "language": "zh-CN",            // ✅ 可改为任何语言
    "languages": ["zh-CN"]          // ✅ 可改为任何语言列表
  },
  "fingerprint": {
    "canvasNoise": 0.041752415,              // ✅ 可改为任意 0-1 之间的值
    "audioContextSeed": 0.4588570074271098,  // ✅ 可改为任意值
    "connectionType": "unknown",              // ✅ 可改为 "wifi" 或 "cellular"
    "effectiveType": "unknown",               // ✅ 可改为 "4g" 或 "3g"
    "downlink": null,                         // ✅ 可改为数字或保持 null
    "rtt": null                               // ✅ 可改为数字或保持 null
  }
}
```

## 注意事项

1. **不要修改硬件相关参数**（screenWidth, screenHeight, devicePixelRatio, hardwareConcurrency）
2. **不要修改 WebGL 参数**（webglRenderer, webglVendor）
3. **不要修改 platform**（必须是 "iPhone"）
4. **不要修改 deviceMemory**（iOS 必须是 undefined）
5. **确保 OS 版本和 Safari 版本匹配**

## 参数一致性检查清单

- [ ] screenWidth/screenHeight 与真实设备匹配
- [ ] devicePixelRatio 与屏幕尺寸匹配
- [ ] hardwareConcurrency 与真实设备匹配
- [ ] webglRenderer/webglVendor 符合 iOS 特征
- [ ] OS 版本与 Safari 版本匹配
- [ ] platform 为 "iPhone"
- [ ] deviceMemory 为 undefined（iOS）
- [ ] maxTouchPoints 为 5（iPhone）

