/**
 * 单个设备管理 API
 * GET /api/devices/[id] - 获取设备详情
 * PUT /api/devices/[id] - 更新设备
 * DELETE /api/devices/[id] - 删除设备
 */

import { NextRequest, NextResponse } from 'next/server';
import { DatabaseAdapter } from '@/src/database/database-adapter';
import { logger } from '@/src/utils/logger';
import type { Platform } from '@/src/types/platform';

const MODULE_NAME = 'API:Device';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  const db = new DatabaseAdapter();
  
  try {
    // 兼容 Next.js 14 和 15：params 可能是 Promise 或直接对象
    const paramsObj = params instanceof Promise ? await params : params;
    const idParam = paramsObj.id;
    const id = parseInt(idParam);
    
    if (isNaN(id) || id <= 0) {
      logger.warn(MODULE_NAME, '无效的设备 ID', { idParam, parsedId: id });
      return NextResponse.json(
        { error: `无效的设备 ID: ${idParam}` },
        { status: 400 }
      );
    }

    const device = await db.getDeviceById(id);
    
    if (!device) {
      return NextResponse.json(
        { error: '设备不存在' },
        { status: 404 }
      );
    }

    logger.info(MODULE_NAME, `获取设备详情: ${device.name}`, { id });
    
    return NextResponse.json({
      success: true,
      data: device,
    });
  } catch (error: any) {
    logger.error(MODULE_NAME, '获取设备详情失败', error);
    return NextResponse.json(
      { error: error.message || '服务器内部错误' },
      { status: 500 }
    );
  } finally {
    await db.close();
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  const db = new DatabaseAdapter();
  
  try {
    // 兼容 Next.js 14 和 15：params 可能是 Promise 或直接对象
    const paramsObj = params instanceof Promise ? await params : params;
    const idParam = paramsObj.id;
    const id = parseInt(idParam);
    
    if (isNaN(id) || id <= 0) {
      logger.warn(MODULE_NAME, '无效的设备 ID', { idParam, parsedId: id });
      return NextResponse.json(
        { error: `无效的设备 ID: ${idParam}` },
        { status: 400 }
      );
    }

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
    if (platform !== 'ios' && platform !== 'android') {
      return NextResponse.json(
        { error: '无效的平台类型' },
        { status: 400 }
      );
    }

    // 检查设备是否存在
    const existingDevice = await db.getDeviceById(id);
    if (!existingDevice) {
      return NextResponse.json(
        { error: '设备不存在' },
        { status: 404 }
      );
    }

    // 构建设备配置对象（不包含 id）
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

    // 更新设备
    await db.updateDevice(id, deviceProfile);

    logger.info(MODULE_NAME, `设备已更新: ${name}`, { id });

    return NextResponse.json({
      success: true,
      message: '设备已更新',
      data: { id, ...deviceProfile },
    });
  } catch (error: any) {
    logger.error(MODULE_NAME, '更新设备失败', error);
    return NextResponse.json(
      { error: error.message || '服务器内部错误' },
      { status: 500 }
    );
  } finally {
    await db.close();
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  const db = new DatabaseAdapter();
  
  try {
    // 兼容 Next.js 14 和 15：params 可能是 Promise 或直接对象
    const paramsObj = params instanceof Promise ? await params : params;
    const idParam = paramsObj.id;
    const id = parseInt(idParam);
    
    logger.info(MODULE_NAME, '删除设备请求', { idParam, parsedId: id, type: typeof idParam });
    
    if (isNaN(id) || id <= 0) {
      logger.warn(MODULE_NAME, '无效的设备 ID', { idParam, parsedId: id, type: typeof idParam });
      return NextResponse.json(
        { error: `无效的设备 ID: ${idParam}` },
        { status: 400 }
      );
    }

    // 检查设备是否存在
    const existingDevice = await db.getDeviceById(id);
    if (!existingDevice) {
      return NextResponse.json(
        { error: '设备不存在' },
        { status: 404 }
      );
    }

    // 删除设备
    await db.deleteDevice(id);

    logger.info(MODULE_NAME, `设备已删除`, { id, name: existingDevice.name });

    return NextResponse.json({
      success: true,
      message: '设备已删除',
    });
  } catch (error: any) {
    logger.error(MODULE_NAME, '删除设备失败', error);
    return NextResponse.json(
      { error: error.message || '服务器内部错误' },
      { status: 500 }
    );
  } finally {
    await db.close();
  }
}

