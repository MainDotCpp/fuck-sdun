/**
 * 保存检测到的设备信息 API
 * POST /api/detect/save
 */

import { NextRequest, NextResponse } from 'next/server';
import { DatabaseAdapter } from '@/src/database/database-adapter';
import { logger } from '@/src/utils/logger';
import type { Platform } from '@/src/types/platform';

const MODULE_NAME = 'API:Detect';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, platform, hardware, system, browser, fingerprint } = body;

    // 验证必填字段
    if (!name || !platform || !hardware || !system || !browser || !fingerprint) {
      return NextResponse.json(
        { error: '缺少必需字段' },
        { status: 400 }
      );
    }

    // 验证平台类型
    if (platform !== 'ios' && platform !== 'android' && platform !== 'unknown') {
      return NextResponse.json(
        { error: '无效的平台类型' },
        { status: 400 }
      );
    }

    // 如果平台是 unknown，跳过保存
    if (platform === 'unknown') {
      logger.warn(MODULE_NAME, '检测到未知平台，跳过保存', { name, userAgent: browser?.userAgent });
      return NextResponse.json({
        success: true,
        message: '未知平台，未保存',
      });
    }

    const db = new DatabaseAdapter();

    try {
      // 检查是否已存在同名设备
      const existingDevice = await db.getDeviceByName(name, platform as Platform);
      if (existingDevice) {
        logger.info(MODULE_NAME, `设备已存在: ${name}`, { platform });
        return NextResponse.json({
          success: true,
          message: '设备已存在',
        });
      }

      // 构建设备配置对象（不包含 id，insertDevice 会自动生成）
      const deviceProfile = {
        name,
        platform: platform as Platform,
        hardware: {
          cpuCores: hardware.cpuCores || 4,
          memory: hardware.memory,
          screenWidth: hardware.screenWidth || 375,
          screenHeight: hardware.screenHeight || 667,
          devicePixelRatio: hardware.devicePixelRatio || 2,
          colorDepth: hardware.colorDepth || 24,
        },
        system: {
          osVersion: system.osVersion || 'Unknown',
          platform: system.platform || 'Unknown',
          // 时区和语言不设置，保持可选
        },
        browser: {
          userAgent: browser.userAgent || 'Unknown',
          version: browser.version || 'Unknown',
          name: browser.name || 'Unknown',
          vendor: browser.vendor || 'Unknown',
          userAgentData: browser.userAgentData || undefined,
        },
        fingerprint: {
          deviceMemory: fingerprint.deviceMemory,
          hardwareConcurrency: fingerprint.hardwareConcurrency || 4,
          maxTouchPoints: fingerprint.maxTouchPoints || 0,
          webglRenderer: fingerprint.webglRenderer,
          webglVendor: fingerprint.webglVendor,
          canvasNoise: fingerprint.canvasNoise,
          audioContextSeed: fingerprint.audioContextSeed,
          connectionType: fingerprint.connectionType,
          effectiveType: fingerprint.effectiveType,
          downlink: fingerprint.downlink,
          rtt: fingerprint.rtt,
        },
      };

      // 保存到数据库
      await db.insertDevice(deviceProfile);

      logger.info(MODULE_NAME, `设备信息已保存: ${name}`, { platform });

      return NextResponse.json({
        success: true,
        message: '设备信息已保存',
        deviceName: name,
      });
    } finally {
      await db.close();
    }
  } catch (error: any) {
    logger.error(MODULE_NAME, '保存设备信息失败', error);
    return NextResponse.json(
      { error: error.message || '服务器内部错误' },
      { status: 500 }
    );
  }
}

