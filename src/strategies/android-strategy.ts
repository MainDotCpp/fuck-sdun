/**
 * Android 指纹策略实现
 */

import type { DeviceProfile } from '../types/index.js';
import type { FingerprintStrategy } from './fingerprint-strategy.js';
import type { LocaleOptions } from '../injectors/fingerprint-injector.js';

export class AndroidFingerprintStrategy implements FingerprintStrategy {
  /**
   * 验证平台兼容性
   */
  validatePlatform(device: DeviceProfile): void {
    if (device.platform !== 'android') {
      throw new Error(`AndroidFingerprintStrategy only supports Android devices, got: ${device.platform}`);
    }
    if (device.fingerprint.deviceMemory === undefined) {
      throw new Error('Android devices should have deviceMemory defined');
    }
  }

  /**
   * 生成 Android 指纹注入脚本
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
  
  // 在页面加载前立即执行，确保在所有检测代码运行前完成修改
  // 使用立即执行函数避免污染全局作用域
  
  // 修改 Navigator 对象
  Object.defineProperty(navigator, 'deviceMemory', {
    get: () => ${fingerprint.deviceMemory},
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
  
  // navigator.platform 对于 Android 设备，通常返回 "Linux armv8l" 或类似值
  // 但检测平台可能会检查这个值，保持与配置一致
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
  
  // Android Chrome 特有：plugins 和 mimeTypes 应该有内容（与 iOS 不同）
  // iOS Safari 的 plugins 和 mimeTypes 为空数组，但 Android Chrome 有插件
  // 创建模拟的 Chrome 插件列表
  (function() {
    const chromePlugins = [];
    
    // Chrome PDF Plugin
    const pdfPlugin = {
      name: 'Chrome PDF Plugin',
      description: 'Portable Document Format',
      filename: 'internal-pdf-viewer',
      length: 1
    };
    pdfPlugin['0'] = {
      type: 'application/pdf',
      suffixes: 'pdf',
      description: 'Portable Document Format',
      enabledPlugin: pdfPlugin
    };
    chromePlugins.push(pdfPlugin);
    
    // Chrome PDF Viewer
    const pdfViewer = {
      name: 'Chrome PDF Viewer',
      description: '',
      filename: 'mhjfbmdgcfjbbpaeojofohoefgiehjai',
      length: 1
    };
    pdfViewer['0'] = {
      type: 'application/pdf',
      suffixes: 'pdf',
      description: '',
      enabledPlugin: pdfViewer
    };
    chromePlugins.push(pdfViewer);
    
    // Native Client
    const naclPlugin = {
      name: 'Native Client',
      description: '',
      filename: 'internal-nacl-plugin',
      length: 2
    };
    naclPlugin['0'] = {
      type: 'application/x-nacl',
      suffixes: '',
      description: 'Native Client Executable',
      enabledPlugin: naclPlugin
    };
    naclPlugin['1'] = {
      type: 'application/x-pnacl',
      suffixes: '',
      description: 'Portable Native Client Executable',
      enabledPlugin: naclPlugin
    };
    chromePlugins.push(naclPlugin);
    
    Object.defineProperty(navigator, 'plugins', {
      get: () => chromePlugins,
      configurable: true
    });
    
    // 创建对应的 mimeTypes
    const chromeMimeTypes = [];
    chromePlugins.forEach(function(plugin) {
      for (let i = 0; i < plugin.length; i++) {
        chromeMimeTypes.push(plugin[i.toString()]);
      }
    });
    
    Object.defineProperty(navigator, 'mimeTypes', {
      get: () => chromeMimeTypes,
      configurable: true
    });
  })();
  
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
  // 强制设置视口宽度，避免 Chrome 最小宽度限制导致的白边问题
  Object.defineProperty(window, 'innerWidth', {
    get: () => ${hardware.screenWidth},
    configurable: true
  });
  
  Object.defineProperty(window, 'innerHeight', {
    get: () => ${hardware.screenHeight},
    configurable: true
  });
  
  // 修复 Chrome 最小宽度限制导致的白边问题
  // 在页面加载时强制设置视口宽度并隐藏水平滚动
  (function fixChromeMinWidth() {
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
  
  // 处理 userAgentData (Client Hints API)
  // 注意：如果通过 CDP 设置了 userAgentMetadata，这里不需要修改
  // 优先使用配置中的 userAgentData（从真机提取的完整数据）
  (function() {
    // 如果 userAgentData 不存在（CDP 设置失败的情况），创建它
    if (!navigator.userAgentData) {
      const uaData = ${JSON.stringify(browser.userAgentData || null)};
      
      if (uaData && uaData.brands && uaData.brands.length > 0) {
        // 使用配置中的 userAgentData（从真机提取）
        const brands = uaData.brands;
        const platform = uaData.platform || 'Android';
        const mobile = uaData.mobile !== undefined ? uaData.mobile : true;
        
        Object.defineProperty(navigator, 'userAgentData', {
          get: () => ({
            platform: platform,
            brands: brands,
            mobile: mobile,
            getHighEntropyValues: function(hints) {
              return Promise.resolve({
                platform: platform,
                platformVersion: uaData.platformVersion || '${system.osVersion}',
                model: uaData.model || 'Android Device',
                mobile: mobile,
                ...(uaData.architecture ? { architecture: uaData.architecture } : {}),
                ...(uaData.bitness ? { bitness: uaData.bitness } : {}),
                ...(uaData.fullVersion ? { fullVersion: uaData.fullVersion } : {}),
                ...(uaData.uaFullVersion ? { uaFullVersion: uaData.uaFullVersion } : {}),
                ...(uaData.wow64 !== undefined ? { wow64: uaData.wow64 } : {})
              });
            }
          }),
          configurable: true,
          enumerable: true
        });
      } else {
        // 如果没有配置，从 User-Agent 中提取（后备方案）
        const ua = navigator.userAgent || '';
        const androidVersionMatch = ua.match(/Android\\s+(\\d+)(?:[._](\\d+))?/i);
        const androidVersion = androidVersionMatch ? androidVersionMatch[1] : '${system.osVersion}';
        
        const modelMatch = ua.match(/Android\\s+[\\d._]+;?\\s*([^;()]+?)(?:\\s+Build\\/|\\)|;)/i);
        const deviceModel = modelMatch && modelMatch[1] ? modelMatch[1].trim() : (ua.match(/\\(([^)]+)\\)/)?.[1] || 'Android Device');
        
        // 从 User-Agent 中提取 Chrome 版本
        const chromeVersionMatch = ua.match(/Chrome\\/(\\d+)(?:\\.(\\d+))?(?:\\.(\\d+))?(?:\\.(\\d+))?/i);
        const chromeMajorVersion = chromeVersionMatch ? chromeVersionMatch[1] : ('${browser.version}'.split('.')[0] || '120');
        
        Object.defineProperty(navigator, 'userAgentData', {
          get: () => ({
            platform: 'Android',
            brands: [
              { brand: 'Google Chrome', version: chromeMajorVersion },
              { brand: 'Not?A_Brand', version: '8' },
              { brand: 'Chromium', version: chromeMajorVersion }
            ],
            mobile: true,
            getHighEntropyValues: function(hints) {
              return Promise.resolve({
                platform: 'Android',
                platformVersion: androidVersion,
                model: deviceModel,
                mobile: true
              });
            }
          }),
          configurable: true,
          enumerable: true
        });
      }
    }
  })();
})();
`.trim();
  }
}

