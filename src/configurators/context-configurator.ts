/**
 * 浏览器上下文配置器
 */

import type { Browser, BrowserContext, Page } from 'playwright';
import type { DeviceProfile } from '../types/index.js';
import { FingerprintInjector } from '../injectors/fingerprint-injector.js';

export interface BrowserOptions {
  /** 是否无头模式 */
  headless?: boolean;
  /** 浏览器启动选项 */
  launchOptions?: Parameters<Browser['launch']>[0];
  /** 上下文选项 */
  contextOptions?: Parameters<Browser['newContext']>[0];
  /** 时区 ID（可选，可通过代理IP动态设置，默认使用设备配置中的值） */
  timezoneId?: string;
  /** 语言代码（可选，可通过代理IP动态设置，默认使用设备配置中的值） */
  language?: string;
  /** 语言列表（可选，可通过代理IP动态设置，默认使用设备配置中的值） */
  languages?: string[];
}

export class ContextConfigurator {
  private fingerprintInjector: FingerprintInjector;

  constructor() {
    this.fingerprintInjector = new FingerprintInjector();
  }

  /**
   * 创建浏览器上下文
   */
  async createContext(
    browser: Browser,
    device: DeviceProfile,
    options?: BrowserOptions
  ): Promise<BrowserContext> {
    const { hardware, system, browser: browserSpec } = device;

    // 使用选项中的时区和语言，如果没有则使用设备配置中的值，再没有则使用默认值
    const timezoneId = options?.timezoneId || system.timezoneId || 'UTC';
    const language = options?.language || system.language || 'en-US';
    const languages = options?.languages || system.languages || [language];

    // 创建上下文配置
    const contextOptions = {
      viewport: {
        width: hardware.screenWidth,
        height: hardware.screenHeight,
      },
      userAgent: browserSpec.userAgent,
      locale: language,
      timezoneId: timezoneId,
      deviceScaleFactor: hardware.devicePixelRatio,
      colorScheme: 'light' as const,
      ...(device.platform === 'ios' && {
        // iOS 特定配置
        isMobile: true,
        hasTouch: true,
      }),
      ...(device.platform === 'android' && {
        // Android 特定配置
        isMobile: true,
        hasTouch: true,
      }),
      ...options?.contextOptions,
    };

    // 创建上下文
    const context = await browser.newContext(contextOptions);

    // 对于 Android 设备，使用 CDP 设置 userAgentData，避免 JavaScript 修改被检测
    if (device.platform === 'android') {
      try {
        // 创建一个临时页面用于 CDP session
        const tempPage = await context.newPage();
        const cdpSession = await context.newCDPSession(tempPage);
        
        // 优先使用配置中的 userAgentData（从真机提取的完整数据）
        // 如果没有配置，则从 User-Agent 中提取
        const ua = browserSpec.userAgent;
        let userAgentMetadata: any;
        
        if (browserSpec.userAgentData && browserSpec.userAgentData.brands && browserSpec.userAgentData.brands.length > 0) {
          // 使用配置中的 userAgentData
          const uaData = browserSpec.userAgentData;
          userAgentMetadata = {
            brands: uaData.brands || [],
            fullVersion: uaData.fullVersion || uaData.uaFullVersion || browserSpec.version,
            platform: uaData.platform || 'Android',
            platformVersion: uaData.platformVersion || system.osVersion,
            architecture: uaData.architecture || (system.platform.includes('aarch64') ? 'arm64' : 'arm'),
            model: uaData.model || (() => {
              const modelMatch = ua.match(/Android\s+[\d._]+;?\s*([^;()]+?)(?:\s+Build\/|\)|;)/i);
              return modelMatch && modelMatch[1] ? modelMatch[1].trim() : (ua.match(/\(([^)]+)\)/)?.[1] || 'Android Device');
            })(),
            mobile: uaData.mobile !== undefined ? uaData.mobile : true,
            ...(uaData.bitness ? { bitness: uaData.bitness } : {}),
            ...(uaData.wow64 !== undefined ? { wow64: uaData.wow64 } : {})
          };
        } else {
          // 如果没有配置，从 User-Agent 中提取
          const androidVersionMatch = ua.match(/\bAndroid\s+(\d+)(?:[._](\d+))?/i);
          const androidVersion = androidVersionMatch ? androidVersionMatch[1] : system.osVersion;
          
          const modelMatch = ua.match(/Android\s+[\d._]+;?\s*([^;()]+?)(?:\s+Build\/|\)|;)/i);
          const deviceModel = modelMatch && modelMatch[1] ? modelMatch[1].trim() : (ua.match(/\(([^)]+)\)/)?.[1] || 'Android Device');
          
          // 从 User-Agent 中提取 Chrome 版本
          const chromeVersionMatch = ua.match(/Chrome\/(\d+)(?:\.(\d+))?(?:\.(\d+))?(?:\.(\d+))?/i);
          const chromeMajorVersion = chromeVersionMatch ? chromeVersionMatch[1] : (browserSpec.version.split('.')[0] || '120');
          const chromeFullVersion = chromeVersionMatch ? `${chromeVersionMatch[1]}.${chromeVersionMatch[2] || '0'}.${chromeVersionMatch[3] || '0'}.${chromeVersionMatch[4] || '0'}` : browserSpec.version;
          
          // 从 system.platform 中提取架构信息
          let architecture = 'arm';
          if (system.platform.includes('aarch64')) {
            architecture = 'arm64';
          } else if (system.platform.includes('armv8l') || system.platform.includes('armv8')) {
            architecture = 'arm';
          } else if (system.platform.includes('x86_64')) {
            architecture = 'x86_64';
          } else if (system.platform.includes('x86')) {
            architecture = 'x86';
          }
          
          userAgentMetadata = {
            brands: [
              { brand: 'Google Chrome', version: chromeMajorVersion },
              { brand: 'Not?A_Brand', version: '8' },
              { brand: 'Chromium', version: chromeMajorVersion }
            ],
            fullVersion: chromeFullVersion,
            platform: 'Android',
            platformVersion: androidVersion,
            architecture: architecture,
            model: deviceModel,
            mobile: true
          };
        }
        
        // 使用 CDP 设置 userAgentMetadata
        await cdpSession.send('Emulation.setUserAgentOverride', {
          userAgent: ua,
          userAgentMetadata: userAgentMetadata
        });
        
        // 关闭临时页面
        await tempPage.close();
      } catch (error) {
        // CDP 设置失败，回退到 JavaScript 注入
        console.warn('Failed to set userAgentData via CDP, falling back to JavaScript injection:', error);
      }
    }

    // 注入指纹（传递时区和语言信息）
    await this.fingerprintInjector.inject(context, device, {
      timezoneId,
      language,
      languages,
    });

    return context;
  }

  /**
   * 创建页面
   */
  async createPage(context: BrowserContext): Promise<Page> {
    return await context.newPage();
  }
}

