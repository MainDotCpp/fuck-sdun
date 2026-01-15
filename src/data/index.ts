/**
 * 设备参数库导出和查询（使用 Prisma 数据库）
 */

import type { DeviceProfile, Platform } from '../types/index';
import { validateDeviceProfile } from '../types/index';
import { DatabaseAdapter } from '../database/database-adapter';

// 创建数据库适配器实例（单例模式）
let dbAdapter: DatabaseAdapter | null = null;

function getDbAdapter(): DatabaseAdapter {
  if (!dbAdapter) {
    dbAdapter = new DatabaseAdapter();
  }
  return dbAdapter;
}

/**
 * 根据设备 ID 获取设备配置
 */
export async function getDeviceById(
  deviceId: string
): Promise<DeviceProfile | undefined> {
  const id = parseInt(deviceId, 10);
  if (isNaN(id)) {
    return undefined;
  }
  return await getDbAdapter().getDeviceById(id);
}

/**
 * 获取所有设备配置
 */
export async function getAllDevices(group?: string): Promise<DeviceProfile[]> {
  return await getDbAdapter().getAllDevices(group);
}

/**
 * 根据平台获取设备配置列表
 */
export async function getDevicesByPlatform(
  platform: Platform,
  group?: string
): Promise<DeviceProfile[]> {
  return await getDbAdapter().getDevicesByPlatform(platform, group);
}

/**
 * 验证并获取设备配置（如果无效会抛出错误）
 */
export async function getValidatedDevice(
  deviceId: string
): Promise<DeviceProfile> {
  const device = await getDeviceById(deviceId);
  if (!device) {
    throw new Error(`Device not found: ${deviceId}`);
  }
  validateDeviceProfile(device);
  return device;
}

/**
 * 关闭数据库连接
 */
export async function closeDatabase(): Promise<void> {
  if (dbAdapter) {
    await dbAdapter.close();
    dbAdapter = null;
  }
}

