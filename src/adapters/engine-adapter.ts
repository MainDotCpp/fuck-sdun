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
    const engine = getEngineForPlatform(platform);
    
    // 根据浏览器引擎选择不同的启动参数
    let stealthArgs: string[] = [];
    
    if (engine === 'chromium') {
      // Chromium/Chrome 特定的反检测参数
      stealthArgs = [
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
      ];
    } else if (engine === 'webkit') {
      // WebKit/Safari 不支持大部分 Chrome 启动参数
      // WebKit 的反检测主要通过 JavaScript 注入实现（在 browser-manager.ts 中）
      // 不添加任何启动参数，避免参数解析错误
      stealthArgs = [];
      logger.debug(MODULE_NAME, 'WebKit 引擎：不使用启动参数，反检测通过 JavaScript 注入实现');
    }
    
    // 合并反检测选项
    const stealthOptions: LaunchOptions = {
      ...options,
      args: [
        ...(options?.args || []),
        ...stealthArgs,
      ],
    };

    logger.debug(MODULE_NAME, `启动浏览器: ${platform}, 引擎: ${engine}, 参数数量: ${stealthArgs.length}`);
    
    const browser = await browserType.launch(stealthOptions);
    
    return browser;
  }
}

