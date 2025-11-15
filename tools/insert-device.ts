/**
 * 插入设备配置到数据库
 * 使用方法：在控制台执行
 * pnpm tsx tools/insert-device.ts <base64_string>
 */

import { DatabaseAdapter } from '../src/database/database-adapter.js';
import type { DeviceProfile } from '../src/types/index.js';
import { validateDeviceProfile } from '../src/types/index.js';

function decodeBase64(base64: string): DeviceProfile {
  try {
    const buffer = Buffer.from(base64, 'base64');
    const jsonString = buffer.toString('utf-8');
    return JSON.parse(jsonString) as DeviceProfile;
  } catch (error) {
    throw new Error('Invalid Base64 format: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
}

async function insertDevice(base64: string) {
  const db = new DatabaseAdapter();

  try {
    // 解码 Base64
    const deviceConfig = decodeBase64(base64);

    // 验证设备配置
    validateDeviceProfile(deviceConfig);

    // 检查设备是否已存在
    const existing = await db.getDeviceByName(deviceConfig.name, deviceConfig.platform);
    if (existing) {
      console.log(`⚠️  设备 "${deviceConfig.name}" (${deviceConfig.platform}) 已存在`);
      console.log(`   设备 ID: ${existing.id}`);
      return;
    }

    // 插入设备
    const { id, ...deviceWithoutId } = deviceConfig;
    const deviceId = await db.insertDevice(deviceWithoutId);

    console.log(`✅ 设备已成功插入数据库！`);
    console.log(`   设备名称: ${deviceConfig.name}`);
    console.log(`   平台: ${deviceConfig.platform}`);
    console.log(`   设备 ID: ${deviceId}`);
  } catch (error) {
    console.error('❌ 插入失败:', error instanceof Error ? error.message : error);
    process.exit(1);
  } finally {
    await db.close();
  }
}

// 从命令行参数获取 Base64 字符串
const base64 = process.argv[2];

if (!base64) {
  console.error('❌ 请提供 Base64 字符串作为参数');
  console.log('使用方法: pnpm tsx tools/insert-device.ts <base64_string>');
  process.exit(1);
}

insertDevice(base64).catch((error) => {
  console.error('未捕获的错误:', error);
  process.exit(1);
});

