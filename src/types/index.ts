/**
 * 类型定义导出
 */

export type { Platform, BrowserEngine } from './platform';
export { getEngineForPlatform, isValidPlatform } from './platform';

export type {
  DeviceProfile,
  HardwareSpec,
  SystemSpec,
  BrowserSpec,
  FingerprintSpec,
} from './device';
export { validateDeviceProfile } from './device';

