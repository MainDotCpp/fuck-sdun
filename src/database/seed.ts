/**
 * Prisma Seed 脚本：将 JSON 配置文件导入数据库（单表设计）
 */

import { PrismaClient } from '@prisma/client';
import type { DeviceProfile } from '../types/index.js';
import iphone from '../data/ios/iphone.json' with { type: 'json' };
import samsungGalaxyS23 from '../data/android/samsung-galaxy-s23.json' with { type: 'json' };
import googlePixel7 from '../data/android/google-pixel-7.json' with { type: 'json' };

// 检查是否有 iphone13.json
let iphone13: DeviceProfile | null = null;
try {
  const iphone13Module = await import('../data/ios/iphone13.json', {
    assert: { type: 'json' },
  });
  iphone13 = iphone13Module.default as DeviceProfile;
} catch {
  // 文件不存在，忽略
}

const prisma = new PrismaClient();

async function main() {
  console.log('开始迁移 JSON 配置到数据库（单表设计）...');

  // 准备要迁移的设备列表
  const devices: DeviceProfile[] = [
    iphone as DeviceProfile,
    samsungGalaxyS23 as DeviceProfile,
    googlePixel7 as DeviceProfile,
  ];

  if (iphone13) {
    devices.push(iphone13);
  }

  let imported = 0;
  let skipped = 0;

  for (const device of devices) {
    try {
      // 检查设备是否已存在（根据名称和平台）
      const existing = await prisma.device.findUnique({
        where: {
          name_platform: {
            name: device.name,
            platform: device.platform,
          },
        },
      });

      if (existing) {
        console.log(`跳过已存在的设备: ${device.name} (${device.platform})`);
        skipped++;
        continue;
      }

      // 移除 id 字段，让数据库自动生成
      const { id, ...deviceWithoutId } = device;

      // 插入设备（单表设计）
      const result = await prisma.device.create({
        data: {
          name: deviceWithoutId.name,
          platform: deviceWithoutId.platform,
          // 硬件参数
          cpuCores: deviceWithoutId.hardware.cpuCores,
          memory: deviceWithoutId.hardware.memory ?? null,
          screenWidth: deviceWithoutId.hardware.screenWidth,
          screenHeight: deviceWithoutId.hardware.screenHeight,
          devicePixelRatio: deviceWithoutId.hardware.devicePixelRatio,
          colorDepth: deviceWithoutId.hardware.colorDepth,
          // 系统参数
          osVersion: deviceWithoutId.system.osVersion,
          systemPlatform: deviceWithoutId.system.platform,
          // 浏览器参数
          userAgent: deviceWithoutId.browser.userAgent,
          browserVersion: deviceWithoutId.browser.version,
          browserName: deviceWithoutId.browser.name,
          browserVendor: deviceWithoutId.browser.vendor,
          userAgentData: deviceWithoutId.browser.userAgentData ? JSON.stringify(deviceWithoutId.browser.userAgentData) : null,
          // 指纹参数
          deviceMemory: deviceWithoutId.fingerprint.deviceMemory ?? null,
          hardwareConcurrency: deviceWithoutId.fingerprint.hardwareConcurrency,
          maxTouchPoints: deviceWithoutId.fingerprint.maxTouchPoints,
          webglRenderer: deviceWithoutId.fingerprint.webglRenderer ?? null,
          webglVendor: deviceWithoutId.fingerprint.webglVendor ?? null,
          canvasNoise: deviceWithoutId.fingerprint.canvasNoise ?? null,
          audioContextSeed: deviceWithoutId.fingerprint.audioContextSeed ?? null,
          connectionType: deviceWithoutId.fingerprint.connectionType ?? null,
          effectiveType: deviceWithoutId.fingerprint.effectiveType ?? null,
          downlink: deviceWithoutId.fingerprint.downlink ?? null,
          rtt: deviceWithoutId.fingerprint.rtt ?? null,
        },
      });

      console.log(
        `导入设备: ${device.name} (${device.platform}) -> ID: ${result.id}`
      );
      imported++;
    } catch (error) {
      console.error(`导入设备失败: ${device.name}`, error);
    }
  }

  console.log(`\n迁移完成！`);
  console.log(`- 导入: ${imported} 个设备`);
  console.log(`- 跳过: ${skipped} 个设备`);
}

main()
  .catch((e) => {
    console.error('迁移失败:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
