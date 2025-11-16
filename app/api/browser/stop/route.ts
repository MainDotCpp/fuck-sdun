/**
 * 停止浏览器 API
 * POST /api/browser/stop
 */

import { NextResponse } from 'next/server';
import { browserManager } from '@/src/lib/browser-manager';
import { logger } from '@/src/utils/logger';

const MODULE_NAME = 'API:Stop';

export async function POST() {
  try {
    await browserManager.closeBrowser();
    return NextResponse.json({
      success: true,
      message: '浏览器已关闭',
    });
  } catch (error) {
    logger.error(MODULE_NAME, '关闭浏览器失败', error);
    return NextResponse.json(
      { error: '关闭浏览器失败' },
      { status: 500 }
    );
  }
}

