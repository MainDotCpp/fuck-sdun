/**
 * 内核适配器
 */

import type { Browser, BrowserType, LaunchOptions } from 'playwright';
import { chromium, webkit } from 'playwright';
import type { Platform } from '../types/index';
import { getEngineForPlatform } from '../types/index';
import { logger } from '../utils/logger';

const MODULE_NAME = 'EngineAdapter';

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
   * 启动浏览器（带反检测配置）
   */
  async launchBrowser(
    platform: Platform,
    options?: LaunchOptions
  ): Promise<Browser> {
    const browserType = this.getBrowserType(platform);
    
    // 合并反检测选项
    const stealthOptions: LaunchOptions = {
      ...options,
      // 反检测：隐藏自动化特征
      args: [
        ...(options?.args || []),
        '--disable-blink-features=AutomationControlled',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
        '--no-sandbox',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process',
        '--disable-site-isolation-trials',
        // 禁用自动化标识
        '--disable-automation',
        // 模拟真实浏览器
        '--disable-infobars',
        '--disable-notifications',
        '--disable-popup-blocking',
        // 禁用密码保存提示
        '--disable-save-password-bubble',
        // 使用真实的用户代理
        '--user-agent=' + (options?.headless === false ? undefined : ''),
      ].filter(Boolean) as string[],
    };

    logger.debug(MODULE_NAME, `启动浏览器: ${platform}, 引擎: ${getEngineForPlatform(platform)}`);
    
    const browser = await browserType.launch(stealthOptions);
    
    return browser;
  }
}

