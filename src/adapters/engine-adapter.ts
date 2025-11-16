/**
 * 内核适配器
 */

import type { Browser, BrowserType, LaunchOptions } from 'playwright';
import { chromium, webkit } from 'playwright';
import type { Platform } from '../types/index';
import { getEngineForPlatform } from '../types/index';

export class EngineAdapter {
  /**
   * 获取平台对应的浏览器类型
   */
  getBrowserType(platform: Platform): BrowserType {
    const engine = getEngineForPlatform(platform);
    switch (engine) {
      case 'webkit':
        return webkit;
      case 'chromium':
        return chromium;
      default:
        throw new Error(`Unsupported engine: ${engine}`);
    }
  }

  /**
   * 启动浏览器
   */
  async launchBrowser(
    platform: Platform,
    options?: LaunchOptions
  ): Promise<Browser> {
    const browserType = this.getBrowserType(platform);
    return await browserType.launch(options);
  }
}

