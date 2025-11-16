/**
 * 设备管理 API
 * GET /api/devices - 获取所有设备
 */

import { NextRequest, NextResponse } from 'next/server';
import { DatabaseAdapter } from '@/src/database/database-adapter';
import { logger } from '@/src/utils/logger';

const MODULE_NAME = 'API:Devices';

export async function GET(request: NextRequest) {
  const db = new DatabaseAdapter();
  
  try {
    const devices = await db.getAllDevices();
    
    logger.info(MODULE_NAME, `获取设备列表，共 ${devices.length} 个设备`);
    
    return NextResponse.json({
      success: true,
      data: devices,
      count: devices.length,
    });
  } catch (error: any) {
    logger.error(MODULE_NAME, '获取设备列表失败', error);
    return NextResponse.json(
      { error: error.message || '服务器内部错误' },
      { status: 500 }
    );
  } finally {
    await db.close();
  }
}

