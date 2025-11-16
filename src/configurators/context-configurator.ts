/**
 * 浏览器上下文配置器
 */

import type { Browser, BrowserContext, Page, BrowserType } from 'playwright';
import type { DeviceProfile } from '../types/index.js';
import { FingerprintInjector } from '../injectors/fingerprint-injector.js';

export interface BrowserOptions {
  /** 是否无头模式 */
  headless?: boolean;
  /** 浏览器启动选项 */
  launchOptions?: Parameters<BrowserType['launch']>[0];
  /** 上下文选项 */
  contextOptions?: Parameters<Browser['newContext']>[0];
  /** 时区 ID（可选，可通过代理IP动态设置，默认使用设备配置中的值） */
  timezoneId?: string;
  /** 语言代码（可选，可通过代理IP动态设置，默认使用设备配置中的值） */
  language?: string;
  /** 语言列表（可选，可通过代理IP动态设置，默认使用设备配置中的值） */
  languages?: string[];
  /** 代理配置（格式：host:port:username:password 或 host:port） */
  proxy?: string | {
    server: string;
    username?: string;
    password?: string;
  };
  /** 语言轮询列表（如果提供，会在列表中轮询选择语言） */
  languageRotation?: string[];
}

export class ContextConfigurator {
  private fingerprintInjector: FingerprintInjector;

  constructor() {
    this.fingerprintInjector = new FingerprintInjector();
  }

  /**
   * 解析代理字符串
   * 格式：host:port:username:password 或 host:port
   */
  private parseProxy(proxyString: string): { server: string; username?: string; password?: string } {
    const parts = proxyString.split(':');
    
    if (parts.length === 2) {
      // host:port
      return {
        server: `http://${parts[0]}:${parts[1]}`,
      };
    } else if (parts.length === 4) {
      // host:port:username:password
      return {
        server: `http://${parts[0]}:${parts[1]}`,
        username: parts[2],
        password: parts[3],
      };
    } else {
      throw new Error(`Invalid proxy format: ${proxyString}. Expected format: host:port or host:port:username:password`);
    }
  }

  /**
   * 从语言轮询列表中选择语言（简单轮询）
   */
  private selectLanguageFromRotation(languageRotation: string[]): string {
    // 使用时间戳进行简单轮询
    const index = Math.floor(Date.now() / 1000) % languageRotation.length;
    return languageRotation[index];
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

    // 处理语言：优先使用轮询列表，然后是直接指定的语言，最后使用设备配置
    let language: string;
    let languages: string[];
    
    if (options?.languageRotation && options.languageRotation.length > 0) {
      // 使用语言轮询
      language = this.selectLanguageFromRotation(options.languageRotation);
      languages = options.languageRotation;
    } else if (options?.language) {
      // 使用指定的语言
      language = options.language;
      languages = options.languages || [language];
    } else {
      // 使用设备配置中的语言
      language = system.language || 'en-US';
      languages = system.languages || [language];
    }

    // 使用选项中的时区，如果没有则使用设备配置中的值，再没有则使用默认值
    const timezoneId = options?.timezoneId || system.timezoneId || 'UTC';

    // 处理代理配置
    let proxyConfig: { server: string; username?: string; password?: string } | undefined;
    if (options?.proxy) {
      if (typeof options.proxy === 'string') {
        proxyConfig = this.parseProxy(options.proxy);
      } else {
        proxyConfig = options.proxy;
      }
    }

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
      ...(proxyConfig && { proxy: proxyConfig }),
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

