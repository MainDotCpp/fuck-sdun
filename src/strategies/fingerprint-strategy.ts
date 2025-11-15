/**
 * 指纹策略接口
 */

import type { DeviceProfile } from '../types/index.js';
import type { LocaleOptions } from '../injectors/fingerprint-injector.js';

/**
 * 指纹策略接口
 */
export interface FingerprintStrategy {
  /**
   * 生成指纹注入脚本
   */
  generateScript(device: DeviceProfile, localeOptions?: LocaleOptions): string;

  /**
   * 验证平台兼容性
   */
  validatePlatform(device: DeviceProfile): void;
}

