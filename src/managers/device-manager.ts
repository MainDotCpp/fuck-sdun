/**
 * 设备管理器
 */

import type { DeviceProfile, Platform } from '../types/index.js';
import { validateDeviceProfile } from '../types/index.js';
import {
  getAllDevices,
  getDeviceById,
  getDevicesByPlatform,
  getValidatedDevice,
} from '../data/index.js';

export class DeviceManager {
  /**
   * 加载设备配置
   */
  async loadDevice(deviceId: string): Promise<DeviceProfile> {
    return await getValidatedDevice(deviceId);
  }

  /**
   * 获取所有设备配置
   */
  async getAllDevices(): Promise<DeviceProfile[]> {
    return await getAllDevices();
  }

  /**
   * 根据平台获取设备配置列表
   */
  async getDevicesByPlatform(platform: Platform): Promise<DeviceProfile[]> {
    return await getDevicesByPlatform(platform);
  }

  /**
   * 验证设备配置
   */
  validateDevice(device: DeviceProfile): void {
    validateDeviceProfile(device);
  }

  /**
   * 检查设备是否存在
   */
  async deviceExists(deviceId: string): Promise<boolean> {
    const device = await getDeviceById(deviceId);
    return device !== undefined;
  }
}

