/**
 * 指纹注入器
 */

import type { BrowserContext } from 'playwright';
import type { DeviceProfile } from '../types/index';
import { IOSFingerprintStrategy } from '../strategies/ios-strategy';
import { AndroidFingerprintStrategy } from '../strategies/android-strategy';
import type { FingerprintStrategy } from '../strategies/fingerprint-strategy';

export interface LocaleOptions {
  /** 时区 ID */
  timezoneId: string;
  /** 语言代码 */
  language: string;
  /** 语言列表 */
  languages: string[];
}

export class FingerprintInjector {
  private strategies: Map<string, FingerprintStrategy>;

  constructor() {
    this.strategies = new Map();
    this.strategies.set('ios', new IOSFingerprintStrategy());
    this.strategies.set('android', new AndroidFingerprintStrategy());
  }

  /**
   * 获取对应平台的指纹策略
   */
  private getStrategy(platform: string): FingerprintStrategy {
    const strategy = this.strategies.get(platform);
    if (!strategy) {
      throw new Error(`Unsupported platform: ${platform}`);
    }
    return strategy;
  }

  /**
   * 注入指纹到浏览器上下文
   */
  async inject(
    context: BrowserContext,
    device: DeviceProfile,
    localeOptions?: LocaleOptions
  ): Promise<void> {
    const strategy = this.getStrategy(device.platform);
    const script = strategy.generateScript(device, localeOptions);
    
    // 在页面加载前注入脚本
    await context.addInitScript(script);
  }
}

