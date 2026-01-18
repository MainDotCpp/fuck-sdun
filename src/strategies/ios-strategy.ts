/**
 * iOS 指纹策略实现
 */

import type { DeviceProfile } from '../types/index';
import type { FingerprintStrategy } from './fingerprint-strategy';
import type { LocaleOptions } from '../injectors/fingerprint-injector';

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

  Object.defineProperty(navigator, 'appVersion', {
    get: () => "${browser.userAgent.replace('Mozilla/', '')}",
    configurable: true
  });

  Object.defineProperty(navigator, 'product', {
    get: () => 'Gecko',
    configurable: true
  });

  Object.defineProperty(navigator, 'productSub', {
    get: () => '20030107',
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
  const webGLGetParameterMock = function(parameter) {
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
  
  Object.defineProperty(webGLGetParameterMock, 'toString', {
    value: function toString() { return 'function getParameter() { [native code] }'; },
    writable: false, configurable: false, enumerable: false
  });
  WebGLRenderingContext.prototype.getParameter = webGLGetParameterMock;
  
  const getParameter2 = WebGL2RenderingContext.prototype.getParameter;
  const webGL2GetParameterMock = function(parameter) {
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
  
  Object.defineProperty(webGL2GetParameterMock, 'toString', {
    value: function toString() { return 'function getParameter() { [native code] }'; },
    writable: false, configurable: false, enumerable: false
  });
  WebGL2RenderingContext.prototype.getParameter = webGL2GetParameterMock;
  
  // 修改 Canvas 指纹
  const toBlob = HTMLCanvasElement.prototype.toBlob;
  const toDataURL = HTMLCanvasElement.prototype.toDataURL;
  
  const toBlobMock = function(callback, type, quality) {
    const canvas = this;
    const context = canvas.getContext('2d');
    if (context) {
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      // 随机生成噪声值（每次调用保持一致）
      const noise = ${Math.random()};
      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, Math.max(0, data[i] + noise * 0.1));
      }
      context.putImageData(imageData, 0, 0);
    }
    return toBlob.call(this, callback, type, quality);
  };
  
  Object.defineProperty(toBlobMock, 'toString', {
    value: function toString() { return 'function toBlob() { [native code] }'; },
    writable: false, configurable: false, enumerable: false
  });
  HTMLCanvasElement.prototype.toBlob = toBlobMock;
  
  const toDataURLMock = function(type, quality) {
    const canvas = this;
    const context = canvas.getContext('2d');
    if (context) {
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      // 随机生成噪声值（每次调用保持一致）
      const noise = ${Math.random()};
      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, Math.max(0, data[i] + noise * 0.1));
      }
      context.putImageData(imageData, 0, 0);
    }
    return toDataURL.call(this, type, quality);
  };

  Object.defineProperty(toDataURLMock, 'toString', {
    value: function toString() { return 'function toDataURL() { [native code] }'; },
    writable: false, configurable: false, enumerable: false
  });
  HTMLCanvasElement.prototype.toDataURL = toDataURLMock;
  
  // 修改 AudioContext 指纹
  const createAnalyser = AudioContext.prototype.createAnalyser;
  const createAnalyserMock = function() {
    const analyser = createAnalyser.call(this);
    const getFloatFrequencyData = analyser.getFloatFrequencyData;
    const getFloatFrequencyDataMock = function(array) {
      getFloatFrequencyData.call(this, array);
      // 随机生成种子值（每次调用保持一致）
      const seed = ${Math.random()};
      for (let i = 0; i < array.length; i++) {
        array[i] += seed * 0.0001;
      }
    };
    Object.defineProperty(getFloatFrequencyDataMock, 'toString', {
      value: function toString() { return 'function getFloatFrequencyData() { [native code] }'; },
      writable: false, configurable: false, enumerable: false
    });
    analyser.getFloatFrequencyData = getFloatFrequencyDataMock;
    return analyser;
  };

  Object.defineProperty(createAnalyserMock, 'toString', {
    value: function toString() { return 'function createAnalyser() { [native code] }'; },
    writable: false, configurable: false, enumerable: false
  });
  AudioContext.prototype.createAnalyser = createAnalyserMock;
  
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

  Object.defineProperty(window, 'outerWidth', {
    get: () => ${hardware.screenWidth},
    configurable: true
  });

  Object.defineProperty(window, 'outerHeight', {
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
    
    // 添加 CSS 防止白边和水平滚动，并模拟 iOS 的隐藏滚动条行为
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
      /* 模拟 iOS 滚动条行为（宽度为0） */
      ::-webkit-scrollbar {
        width: 0 !important;
        height: 0 !important;
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
    const ApplePaySessionMock = function() {};
    ApplePaySessionMock.supportsVersion = function(version) {
      // 2.0 检测脚本会检查 version 3
      return version >= 1 && version <= 12; 
    };
    ApplePaySessionMock.canMakePayments = function() {
      return true;
    };
    ApplePaySessionMock.canMakePaymentsWithActiveCard = function() {
      return Promise.resolve(true);
    };
    
    // 也要确保 toString 返回 [native code]
    Object.defineProperty(ApplePaySessionMock, 'toString', {
      value: function toString() { return 'function ApplePaySession() { [native code] }'; },
      writable: false, configurable: false, enumerable: false
    });
    Object.defineProperty(ApplePaySessionMock.supportsVersion, 'toString', {
      value: function toString() { return 'function supportsVersion() { [native code] }'; },
      writable: false, configurable: false, enumerable: false
    });

    window.ApplePaySession = ApplePaySessionMock;
  }
  
  // 移除或隐藏不属于 iOS Safari 的 API (如 IdleDetector, NDEFReader, userAgentData)
  // 如果当前是 Chromium 环境模拟，则需要彻底清除这些 Chromium 特有的标识
  if ('IdleDetector' in window) delete window.IdleDetector;
  if ('NDEFReader' in window) delete window.NDEFReader;
  if ('chrome' in window) delete window.chrome;
  if (navigator.contacts) delete navigator.contacts;
  
  // 关键：iOS Safari 绝对没有 userAgentData
  // 如果存在（例如在 Chromium 中模拟），必须彻底删除，否则会被作为模拟器直接识破
  if ('userAgentData' in navigator) {
    // @ts-ignore
    delete navigator.userAgentData;
  }

  // iOS PWA standalone 模式
  Object.defineProperty(navigator, 'standalone', {
    get: () => false,
    configurable: true,
    enumerable: true
  });
  
  // 彻底移除 webdriver 标识
  if (navigator.webdriver !== undefined) {
    try {
      Object.defineProperty(navigator, 'webdriver', {
        get: () => false,
        configurable: true
      });
      // @ts-ignore
      delete navigator.webdriver;
    } catch (e) {}
  }
  
})();
`.trim();
  }
}

