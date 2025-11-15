/**
 * iOS 指纹策略实现
 */

import type { DeviceProfile } from '../types/index.js';
import type { FingerprintStrategy } from './fingerprint-strategy.js';
import type { LocaleOptions } from '../injectors/fingerprint-injector.js';

export class IOSFingerprintStrategy implements FingerprintStrategy {
  /**
   * 验证平台兼容性
   */
  validatePlatform(device: DeviceProfile): void {
    if (device.platform !== 'ios') {
      throw new Error(`IOSFingerprintStrategy only supports iOS devices, got: ${device.platform}`);
    }
    if (device.fingerprint.deviceMemory !== undefined) {
      throw new Error('iOS devices must not have deviceMemory defined');
    }
  }

  /**
   * 生成 iOS 指纹注入脚本
   */
  generateScript(device: DeviceProfile, localeOptions?: LocaleOptions): string {
    this.validatePlatform(device);

    const { hardware, system, browser, fingerprint } = device;
    
    // 使用传入的时区和语言选项，如果没有则使用设备配置中的值，再没有则使用默认值
    const timezoneId = localeOptions?.timezoneId || system.timezoneId || 'UTC';
    const language = localeOptions?.language || system.language || 'en-US';
    const languages = localeOptions?.languages || system.languages || [language];

    return `
(function() {
  'use strict';
  
  // 修改 Navigator 对象
  Object.defineProperty(navigator, 'deviceMemory', {
    get: () => undefined,
    configurable: true
  });
  
  Object.defineProperty(navigator, 'hardwareConcurrency', {
    get: () => ${fingerprint.hardwareConcurrency},
    configurable: true
  });
  
  Object.defineProperty(navigator, 'maxTouchPoints', {
    get: () => ${fingerprint.maxTouchPoints},
    configurable: true
  });
  
  Object.defineProperty(navigator, 'platform', {
    get: () => '${system.platform}',
    configurable: true
  });
  
  Object.defineProperty(navigator, 'language', {
    get: () => '${language}',
    configurable: true
  });
  
  Object.defineProperty(navigator, 'languages', {
    get: () => ${JSON.stringify(languages)},
    configurable: true
  });
  
  Object.defineProperty(navigator, 'vendor', {
    get: () => '${browser.vendor}',
    configurable: true
  });
  
  // iOS 设备 plugins 和 mimeTypes 必须为空数组
  Object.defineProperty(navigator, 'plugins', {
    get: () => [],
    configurable: true
  });
  
  Object.defineProperty(navigator, 'mimeTypes', {
    get: () => [],
    configurable: true
  });
  
  // 修改屏幕属性
  Object.defineProperty(screen, 'width', {
    get: () => ${hardware.screenWidth},
    configurable: true
  });
  
  Object.defineProperty(screen, 'height', {
    get: () => ${hardware.screenHeight},
    configurable: true
  });
  
  Object.defineProperty(screen, 'availWidth', {
    get: () => ${hardware.screenWidth},
    configurable: true
  });
  
  Object.defineProperty(screen, 'availHeight', {
    get: () => ${hardware.screenHeight},
    configurable: true
  });
  
  Object.defineProperty(screen, 'colorDepth', {
    get: () => ${hardware.colorDepth},
    configurable: true
  });
  
  Object.defineProperty(screen, 'pixelDepth', {
    get: () => ${hardware.colorDepth},
    configurable: true
  });
  
  // 修改设备像素比
  Object.defineProperty(window, 'devicePixelRatio', {
    get: () => ${hardware.devicePixelRatio},
    configurable: true
  });
  
  // 修改 WebGL 参数
  const getParameter = WebGLRenderingContext.prototype.getParameter;
  WebGLRenderingContext.prototype.getParameter = function(parameter) {
    if (parameter === 37445) { // UNMASKED_VENDOR_WEBGL
      return '${fingerprint.webglVendor || ''}';
    }
    if (parameter === 37446) { // UNMASKED_RENDERER_WEBGL
      return '${fingerprint.webglRenderer || ''}';
    }
    // 处理 WebGL 限制参数，使用真实设备的典型值
    if (parameter === 3379) { // MAX_TEXTURE_SIZE
      return 16384;
    }
    if (parameter === 34024) { // MAX_RENDERBUFFER_SIZE
      return 16384;
    }
    if (parameter === 34817 || parameter === 36347) { // MAX_VARYING_VECTORS / MAX_VARYING_FLOATS
      return 30;
    }
    return getParameter.call(this, parameter);
  };
  
  const getParameter2 = WebGL2RenderingContext.prototype.getParameter;
  WebGL2RenderingContext.prototype.getParameter = function(parameter) {
    if (parameter === 37445) {
      return '${fingerprint.webglVendor || ''}';
    }
    if (parameter === 37446) {
      return '${fingerprint.webglRenderer || ''}';
    }
    if (parameter === 3379) {
      return 16384;
    }
    if (parameter === 34024) {
      return 16384;
    }
    if (parameter === 34817 || parameter === 36347) {
      return 30;
    }
    return getParameter2.call(this, parameter);
  };
  
  // 修改 Canvas 指纹
  const toBlob = HTMLCanvasElement.prototype.toBlob;
  const toDataURL = HTMLCanvasElement.prototype.toDataURL;
  const getImageData = CanvasRenderingContext2D.prototype.getImageData;
  
  HTMLCanvasElement.prototype.toBlob = function(callback, type, quality) {
    const canvas = this;
    const context = canvas.getContext('2d');
    if (context) {
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      // 添加微小的噪声以保持一致性
      const noise = ${fingerprint.canvasNoise || 0};
      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, Math.max(0, data[i] + noise * 0.1));
      }
      context.putImageData(imageData, 0, 0);
    }
    return toBlob.call(this, callback, type, quality);
  };
  
  HTMLCanvasElement.prototype.toDataURL = function(type, quality) {
    const canvas = this;
    const context = canvas.getContext('2d');
    if (context) {
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const noise = ${fingerprint.canvasNoise || 0};
      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, Math.max(0, data[i] + noise * 0.1));
      }
      context.putImageData(imageData, 0, 0);
    }
    return toDataURL.call(this, type, quality);
  };
  
  // 修改 AudioContext 指纹
  const createAnalyser = AudioContext.prototype.createAnalyser;
  AudioContext.prototype.createAnalyser = function() {
    const analyser = createAnalyser.call(this);
    const getFloatFrequencyData = analyser.getFloatFrequencyData;
    analyser.getFloatFrequencyData = function(array) {
      getFloatFrequencyData.call(this, array);
      const seed = ${fingerprint.audioContextSeed || 0};
      for (let i = 0; i < array.length; i++) {
        array[i] += seed * 0.0001;
      }
    };
    return analyser;
  };
  
  // 修改网络信息
  if (navigator.connection) {
    Object.defineProperty(navigator.connection, 'type', {
      get: () => '${fingerprint.connectionType || 'wifi'}',
      configurable: true
    });
    
    Object.defineProperty(navigator.connection, 'effectiveType', {
      get: () => '${fingerprint.effectiveType || '4g'}',
      configurable: true
    });
    
    Object.defineProperty(navigator.connection, 'downlink', {
      get: () => ${fingerprint.downlink || 10},
      configurable: true
    });
    
    Object.defineProperty(navigator.connection, 'rtt', {
      get: () => ${fingerprint.rtt || 50},
      configurable: true
    });
  }
  
  // 修改 window.innerWidth 和 innerHeight（需要与 viewport 匹配）
  // 强制设置视口宽度，避免浏览器最小宽度限制导致的白边问题
  Object.defineProperty(window, 'innerWidth', {
    get: () => ${hardware.screenWidth},
    configurable: true
  });
  
  Object.defineProperty(window, 'innerHeight', {
    get: () => ${hardware.screenHeight},
    configurable: true
  });
  
  // 修复浏览器最小宽度限制导致的白边问题
  // 在页面加载时强制设置视口宽度并隐藏水平滚动
  (function fixMinWidth() {
    // 设置 viewport meta 标签
    const setViewport = function() {
      let viewport = document.querySelector('meta[name="viewport"]');
      if (!viewport) {
        viewport = document.createElement('meta');
        viewport.setAttribute('name', 'viewport');
        document.head.appendChild(viewport);
      }
      viewport.setAttribute('content', 'width=${hardware.screenWidth}, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    };
    
    // 立即执行
    if (document.head) {
      setViewport();
    } else {
      document.addEventListener('DOMContentLoaded', setViewport);
    }
    
    // 添加 CSS 防止白边和水平滚动
    const style = document.createElement('style');
    style.textContent = \`
      html, body {
        width: ${hardware.screenWidth}px !important;
        max-width: ${hardware.screenWidth}px !important;
        overflow-x: hidden !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      * {
        max-width: 100% !important;
        box-sizing: border-box !important;
      }
    \`;
    
    if (document.head) {
      document.head.appendChild(style);
    } else {
      document.addEventListener('DOMContentLoaded', function() {
        document.head.appendChild(style);
      });
    }
    
    // 强制设置 body 宽度
    const setBodyWidth = function() {
      if (document.body) {
        document.body.style.width = '${hardware.screenWidth}px';
        document.body.style.maxWidth = '${hardware.screenWidth}px';
        document.body.style.overflowX = 'hidden';
      }
    };
    
    if (document.body) {
      setBodyWidth();
    } else {
      document.addEventListener('DOMContentLoaded', setBodyWidth);
    }
    
    // 监听窗口大小变化，确保宽度一致
    window.addEventListener('resize', function() {
      if (window.innerWidth !== ${hardware.screenWidth}) {
        document.documentElement.style.width = '${hardware.screenWidth}px';
        document.documentElement.style.maxWidth = '${hardware.screenWidth}px';
        if (document.body) {
          document.body.style.width = '${hardware.screenWidth}px';
          document.body.style.maxWidth = '${hardware.screenWidth}px';
        }
      }
    });
  })();
  
  // 修改时区和 Intl API
  const originalDate = Date;
  const originalGetTimezoneOffset = Date.prototype.getTimezoneOffset;
  Date.prototype.getTimezoneOffset = function() {
    // 根据时区ID计算偏移（简化处理，实际应该完整实现）
    const timezoneId = '${timezoneId}';
    // 这里应该根据时区ID计算实际偏移，暂时使用原始值
    return originalGetTimezoneOffset.call(this);
  };
  
  // 修改 Intl.DateTimeFormat 的 resolvedOptions
  const originalResolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions;
  Intl.DateTimeFormat.prototype.resolvedOptions = function() {
    const options = originalResolvedOptions.call(this);
    options.timeZone = '${timezoneId}';
    return options;
  };
  
  // iOS 特殊能力：ApplePaySession（仅在 iOS Safari 中存在）
  if (!window.ApplePaySession) {
    window.ApplePaySession = function() {};
    window.ApplePaySession.supportsVersion = function(version) {
      return version === 3;
    };
    window.ApplePaySession.canMakePayments = function() {
      return false;
    };
  }
  
  // iOS PWA standalone 模式
  Object.defineProperty(navigator, 'standalone', {
    get: () => false,
    configurable: true,
    enumerable: true
  });
  
  // 处理 userAgentData (Client Hints API)
  // 优化：使用 Proxy 隐藏属性描述符，避免被检测脚本发现 configurable: true
  if (!navigator.userAgentData) {
    // 优化：使用 Function 构造函数创建 getHighEntropyValues，避免 Promise.resolve 特征
    const getHighEntropyValuesCode = [
      'var result = {',
      '  platform: ' + ${JSON.stringify(system.platform)} + ',',
      '  platformVersion: ' + ${JSON.stringify(system.osVersion)} + ',',
      '  model: ' + ${JSON.stringify('iPhone')} + ',',
      '  mobile: true',
      '};',
      'var p = new Promise(function(r) { r(result); });',
      'return p;'
    ].join('\\n');
    
    const getHighEntropyValuesFn = new Function('hints', getHighEntropyValuesCode);
    
    // 优化：修改 getHighEntropyValues 的 toString，使其返回 [native code]
    Object.defineProperty(getHighEntropyValuesFn, 'toString', {
      value: function toString() { return 'function getHighEntropyValues() { [native code] }'; },
      writable: false,
      configurable: false,
      enumerable: false
    });
    
    const userAgentDataValue = {
      platform: '${system.platform}',
      brands: [
        { brand: 'Safari', version: '${browser.version}' }
      ],
      mobile: true,
      getHighEntropyValues: getHighEntropyValuesFn
    };
    
    // 优化：拦截 Object.getOwnPropertyDescriptor，隐藏属性描述符的真实值
    // 必须在定义属性之前设置拦截器
    const originalGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    Object.getOwnPropertyDescriptor = function(obj, prop) {
      if (obj === navigator && prop === 'userAgentData') {
        // 返回一个假的描述符，显示 configurable: false
        const realDesc = originalGetOwnPropertyDescriptor.call(Object, obj, prop);
        if (realDesc) {
          return {
            get: realDesc.get,
            set: realDesc.set,
            enumerable: realDesc.enumerable,
            configurable: false,  // 伪装成不可配置
            writable: false
          };
        }
      }
      return originalGetOwnPropertyDescriptor.call(Object, obj, prop);
    };
    
    // 定义 userAgentData 属性
    Object.defineProperty(navigator, 'userAgentData', {
      get: () => userAgentDataValue,
      configurable: true,  // 实际设置为 true（因为 false 会失败）
      enumerable: true
    });
  }
  
})();
`.trim();
  }
}

