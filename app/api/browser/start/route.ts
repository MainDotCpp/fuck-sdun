/**
 * 启动浏览器 API
 * POST /api/browser/start
 */

import { NextRequest, NextResponse } from 'next/server';
import { browserManager } from '@/src/lib/browser-manager';
import { logger } from '@/src/utils/logger';

const MODULE_NAME = 'API:Start';

export async function POST(request: NextRequest) {
  try {
    // 解析请求体
    const body = await request.json();
    const { url, referer, languageRotation } = body;

    // 验证参数
    if (!url) {
      return NextResponse.json(
        { error: '缺少必需参数: url' },
        { status: 400 }
      );
    }

    // 验证 URL 格式
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: '无效的 URL 格式' },
        { status: 400 }
      );
    }

    // 先检查锁（同步检查），获取不到锁直接返回错误
    // 必须在验证参数之后检查，避免无效请求占用锁检查资源
    if (browserManager.hasActiveSession()) {
      return NextResponse.json(
        { error: '上一次请求正在处理中，请稍后再试' },
        { status: 429 }
      );
    }

    // 无论是否能获取到锁，都先保存目标网址（用于限制多人使用：后到达的请求会覆盖先到达的请求）
    browserManager.setPendingRequest(url, referer, languageRotation);

    // 尝试获取锁（同步操作）
    // 如果获取不到锁，直接返回错误，不启动浏览器
    // 但目标网址已经保存，如果当前正在处理的请求延迟结束后，会使用最新的网址
    if (!browserManager.tryAcquireLock()) {
      return NextResponse.json(
        { error: '上一次请求正在处理中，请稍后再试' },
        { status: 429 }
      );
    }

    // 已经获取到锁，异步启动浏览器（延迟在 startBrowser 内部）
    // startBrowser 内部会检测到锁已被获取并继续执行
    // 注意：startBrowser 会在延迟结束后读取最新的 pendingUrl，而不是使用传入的参数
    browserManager.startBrowser().catch((error) => {
      logger.error(MODULE_NAME, '启动浏览器失败', error);
      // 如果启动失败，释放锁
      browserManager.releaseLockPublic();
    });

    // 立即返回成功响应
    return NextResponse.json({
      success: true,
      message: '浏览器启动请求已提交，正在后台处理',
    });
  } catch (error) {
    logger.error(MODULE_NAME, 'API 处理错误', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}

