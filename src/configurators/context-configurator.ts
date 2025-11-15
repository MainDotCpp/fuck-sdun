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

