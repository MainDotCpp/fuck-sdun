/**
 * Prisma 数据库适配器
 */

import { PrismaClient } from '@prisma/client';
import type { DeviceProfile, Platform } from '../types/index';
import { validateDeviceProfile } from '../types/index';
import { logger } from '../utils/logger';

const MODULE_NAME = 'DatabaseAdapter';

export class DatabaseAdapter {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  /**
   * 关闭数据库连接
   */
  async close(): Promise<void> {
    await this.prisma.$disconnect();
  }

  /**
   * 根据 ID 获取设备配置
   */
  async getDeviceById(id: number): Promise<DeviceProfile | undefined> {
    const device = await this.prisma.device.findUnique({
      where: { id },
    });

    if (!device) {
      return undefined;
    }

    return this.buildDeviceProfile(device);
  }

  /**
   * 根据名称、平台和组获取设备配置
   */
  async getDeviceByName(
    name: string,
    platform: Platform,
    group: string = 'default'
  ): Promise<DeviceProfile | undefined> {
    const device = await this.prisma.device.findUnique({
      where: {
        name_platform_group: {
          name,
          platform,
          group,
        },
      },
    });

    if (!device) {
      return undefined;
    }

    return this.buildDeviceProfile(device);
  }

  /**
   * 获取所有设备配置
   */
  async getAllDevices(group?: string): Promise<DeviceProfile[]> {
    const devices = await this.prisma.device.findMany({
      where: group ? { group } : {},
      orderBy: {
        id: 'asc',
      },
    });

    return devices.map((device) => this.buildDeviceProfile(device));
  }

  /**
   * 根据平台和组获取设备配置列表
   */
  async getDevicesByPlatform(platform: Platform, group?: string): Promise<DeviceProfile[]> {
    const devices = await this.prisma.device.findMany({
      where: { 
        platform,
        ...(group ? { group } : {})
      },
      orderBy: {
        id: 'asc',
      },
    });

    return devices.map((device) => this.buildDeviceProfile(device));
  }

  /**
   * 构建完整的设备配置对象
   */
  private buildDeviceProfile(device: any): DeviceProfile {
    // 解析 userAgentData
    let userAgentData: any = undefined;
    if (device.userAgentData) {
      try {
        userAgentData = JSON.parse(device.userAgentData);
        logger.debug(MODULE_NAME, 'Parsed userAgentData:', JSON.stringify(userAgentData, null, 2));
      } catch (error) {
        logger.warn(MODULE_NAME, 'Failed to parse userAgentData', error);
      }
    } else {
      logger.debug(MODULE_NAME, 'No userAgentData in database record');
    }
    
    return {
      id: device.id.toString(), // 转换为字符串以保持 API 兼容性
      name: device.name,
      platform: device.platform as Platform,
      group: device.group,
      hardware: {
        cpuCores: device.cpuCores,
        memory: device.memory ?? undefined,
        screenWidth: device.screenWidth,
        screenHeight: device.screenHeight,
        devicePixelRatio: device.devicePixelRatio,
        colorDepth: device.colorDepth,
      },
      system: {
        osVersion: device.osVersion,
        platform: device.systemPlatform,
      },
      browser: {
        userAgent: device.userAgent,
        version: device.browserVersion,
        name: device.browserName,
        vendor: device.browserVendor,
        ...(userAgentData ? { userAgentData } : {}),
      },
      fingerprint: {
        deviceMemory: device.deviceMemory ?? undefined,
        hardwareConcurrency: device.hardwareConcurrency,
        maxTouchPoints: device.maxTouchPoints,
        webglRenderer: device.webglRenderer ?? undefined,
        webglVendor: device.webglVendor ?? undefined,
        canvasNoise: device.canvasNoise ?? undefined,
        audioContextSeed: device.audioContextSeed ?? undefined,
        connectionType: device.connectionType ?? undefined,
        effectiveType: device.effectiveType ?? undefined,
        downlink: device.downlink ?? undefined,
        rtt: device.rtt ?? undefined,
      },
    };
  }

  /**
   * 插入设备配置
   */
  async insertDevice(device: Omit<DeviceProfile, 'id'>): Promise<number> {
    const result = await this.prisma.device.create({
      data: {
        name: device.name,
        platform: device.platform,
        group: device.group || 'default',
        // 硬件参数
        cpuCores: device.hardware.cpuCores,
        memory: device.hardware.memory ?? null,
        screenWidth: device.hardware.screenWidth,
        screenHeight: device.hardware.screenHeight,
        devicePixelRatio: device.hardware.devicePixelRatio,
        colorDepth: device.hardware.colorDepth,
        // 系统参数
        osVersion: device.system.osVersion,
        systemPlatform: device.system.platform,
        // 浏览器参数
        userAgent: device.browser.userAgent,
        browserVersion: device.browser.version,
        browserName: device.browser.name,
        browserVendor: device.browser.vendor,
        userAgentData: device.browser.userAgentData ? JSON.stringify(device.browser.userAgentData) : null,
        // 指纹参数
        deviceMemory: device.fingerprint.deviceMemory ?? null,
        hardwareConcurrency: device.fingerprint.hardwareConcurrency,
        maxTouchPoints: device.fingerprint.maxTouchPoints,
        webglRenderer: device.fingerprint.webglRenderer ?? null,
        webglVendor: device.fingerprint.webglVendor ?? null,
        canvasNoise: device.fingerprint.canvasNoise ?? null,
        audioContextSeed: device.fingerprint.audioContextSeed ?? null,
        connectionType: device.fingerprint.connectionType ?? null,
        effectiveType: device.fingerprint.effectiveType ?? null,
        downlink: device.fingerprint.downlink ?? null,
        rtt: device.fingerprint.rtt ?? null,
      },
    });

    return result.id;
  }

  /**
   * 更新设备配置
   */
  async updateDevice(
    id: number,
    device: Omit<DeviceProfile, 'id'>
  ): Promise<void> {
    await this.prisma.device.update({
      where: { id },
      data: {
        name: device.name,
        platform: device.platform,
        group: device.group || 'default',
        // 硬件参数
        cpuCores: device.hardware.cpuCores,
        memory: device.hardware.memory ?? null,
        screenWidth: device.hardware.screenWidth,
        screenHeight: device.hardware.screenHeight,
        devicePixelRatio: device.hardware.devicePixelRatio,
        colorDepth: device.hardware.colorDepth,
        // 系统参数
        osVersion: device.system.osVersion,
        systemPlatform: device.system.platform,
        // 浏览器参数
        userAgent: device.browser.userAgent,
        browserVersion: device.browser.version,
        browserName: device.browser.name,
        browserVendor: device.browser.vendor,
        userAgentData: device.browser.userAgentData ? JSON.stringify(device.browser.userAgentData) : null,
        // 指纹参数
        deviceMemory: device.fingerprint.deviceMemory ?? null,
        hardwareConcurrency: device.fingerprint.hardwareConcurrency,
        maxTouchPoints: device.fingerprint.maxTouchPoints,
        webglRenderer: device.fingerprint.webglRenderer ?? null,
        webglVendor: device.fingerprint.webglVendor ?? null,
        canvasNoise: device.fingerprint.canvasNoise ?? null,
        audioContextSeed: device.fingerprint.audioContextSeed ?? null,
        connectionType: device.fingerprint.connectionType ?? null,
        effectiveType: device.fingerprint.effectiveType ?? null,
        downlink: device.fingerprint.downlink ?? null,
        rtt: device.fingerprint.rtt ?? null,
      },
    });
  }

  /**
   * 删除设备配置
   */
  async deleteDevice(id: number): Promise<void> {
    await this.prisma.device.delete({
      where: { id },
    });
  }

  /**
   * 验证设备配置
   */
  validateDevice(device: DeviceProfile): void {
    validateDeviceProfile(device);
  }
}

