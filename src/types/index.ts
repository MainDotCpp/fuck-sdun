/**
 * 类型定义导出
 */

export type { Platform, BrowserEngine } from './platform.js';
export { getEngineForPlatform, isValidPlatform } from './platform.js';

export type {
  DeviceProfile,
  HardwareSpec,
  SystemSpec,
  BrowserSpec,
  FingerprintSpec,
} from './device.js';
export { validateDeviceProfile } from './device.js';

