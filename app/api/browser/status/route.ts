/**
 * 获取浏览器状态 API
 * GET /api/browser/status
 */

import { NextResponse } from 'next/server';
import { browserManager } from '@/src/lib/browser-manager';
import { logger } from '@/src/utils/logger';

const MODULE_NAME = 'API:Status';

export async function GET() {
  try {
    const status = browserManager.getStatus();
    return NextResponse.json(status);
  } catch (error) {
    logger.error(MODULE_NAME, '获取状态失败', error);
    return NextResponse.json(
      { error: '获取状态失败' },
      { status: 500 }
    );
  }
}

