/**
 * 浏览器管理器
 * 负责管理浏览器实例和锁机制
 */

import type { Browser, Page } from 'playwright';
import { createMobileBrowser } from '../index';
import { DatabaseAdapter } from '../database/database-adapter';
import type { BrowserOptions } from '../configurators/context-configurator';
import { logger } from '../utils/logger';
import { ProxyService } from '../services/proxy-service';

const MODULE_NAME = 'BrowserManager';

interface BrowserSession {
  browser: Browser;
  page: Page;
  deviceId: string;
  deviceName: string;
  startedAt: Date;
}

class BrowserManager {
  private static instance: BrowserManager;
  private currentSession: BrowserSession | null = null;
  private lock: boolean = false;
  private db: DatabaseAdapter;

  private constructor() {
    this.db = new DatabaseAdapter();
  }

  static getInstance(): BrowserManager {
    if (!BrowserManager.instance) {
      BrowserManager.instance = new BrowserManager();
    }
    return BrowserManager.instance;
  }

  /**
   * 尝试获取锁
   * @returns 是否成功获取锁
   */
  tryLock(): boolean {
    if (this.lock) {
      return false;
    }
    this.lock = true;
    return true;
  }

  /**
   * 尝试获取锁（公共方法，供 API 使用）
   * @returns 是否成功获取锁
   */
  tryAcquireLock(): boolean {
    return this.tryLock();
  }

  /**
   * 释放锁
   */
  releaseLock(): void {
    this.lock = false;
  }

  /**
   * 释放锁（公共方法，供 API 使用）
   */
  releaseLockPublic(): void {
    this.releaseLock();
  }

  /**
   * 检查是否有正在运行的浏览器
   */
  hasActiveSession(): boolean {
    return this.lock && this.currentSession !== null;
  }

  /**
   * 获取当前会话信息
   */
  getCurrentSession(): BrowserSession | null {
    return this.currentSession;
  }

  /**
   * 从数据库随机选择一个 iOS 设备
   */
  private async getRandomDevice(): Promise<{ id: string; name: string }> {
    const devices = await this.db.getDevicesByPlatform('ios');
    if (devices.length === 0) {
      throw new Error('数据库中没有可用的 iOS 设备');
    }
    const randomIndex = Math.floor(Math.random() * devices.length);
    const device = devices[randomIndex];
    return {
      id: String(device.id),
      name: device.name,
    };
  }

  /**
   * 从语言列表中随机选择语言
   */
  private getRandomLanguage(languages: string[]): string {
    if (languages.length === 0) {
      return 'en-US';
    }
    const randomIndex = Math.floor(Math.random() * languages.length);
    return languages[randomIndex];
  }

  /**
   * 启动浏览器并访问指定网址
   * @param url 目标网址
   * @param referer Referer 头（可选）
   * @param languageRotation 语言轮询列表（可选）
   */
  async startBrowser(
    url: string,
    referer?: string,
    languageRotation?: string[]
  ): Promise<void> {
    // 检查锁（如果锁已经被获取，这里会失败，但 API 已经处理了这种情况）
    // 如果 API 已经获取了锁，这里再次尝试获取会失败，但这是预期的
    // 实际上，如果 API 已经获取了锁，这里应该跳过检查
    // 但为了保持代码的健壮性，我们仍然检查
    if (!this.lock) {
      // 如果锁没有被获取，尝试获取
      if (!this.tryLock()) {
        throw new Error('上一次请求正在处理中，请稍后再试');
      }
    }
    // 如果锁已经被获取（由 API 获取），继续执行

    try {
      // 🐌 负优化：启动前随机延迟（模拟设备初始化时间，可以注释掉以提高响应速度）
      // 延迟放在获取锁之后，确保锁已获取
      const randomDelay = Math.floor(Math.random() * (25000 - 15000 + 1)) + 15000; // 15-60秒随机延迟
      logger.info(MODULE_NAME, `设备初始化中，预计等待 ${Math.round(randomDelay / 1000)} 秒...`);
      await new Promise(resolve => setTimeout(resolve, randomDelay));

      // 获取代理配置
      // 优先使用固定代理，如果未设置则从 922proxy API 获取
      let proxyString: string | undefined;

      // 检查是否配置了固定代理
      const { FIXED_PROXY } = await import('../config/proxy-config');
      if (FIXED_PROXY) {
        proxyString = FIXED_PROXY;
        logger.info(MODULE_NAME, `使用固定代理: ${FIXED_PROXY.split(':')[0]}:${FIXED_PROXY.split(':')[1]}`);
      } else {
        // 从 922proxy 获取代理（日本+随机城市）
        // 如果获取失败，直接终止任务，不启动浏览器
        const proxyService = ProxyService.createDefault();
        if (!proxyService) {
          const errorMsg = '未配置固定代理，且 922proxy 配置未设置。请在 src/config/proxy-config.ts 中配置 FIXED_PROXY 或 token、key 和 username';
          logger.error(MODULE_NAME, errorMsg);
          throw new Error(errorMsg);
        }

        try {
          const proxyConfig = await proxyService.getProxy();
          proxyString = proxyConfig.proxyString;
          logger.info(MODULE_NAME, `已从 API 获取代理: ${proxyConfig.parsed.server}`);
        } catch (error) {
          logger.error(MODULE_NAME, '获取代理失败，终止任务', error);
          throw new Error(`获取代理失败: ${error instanceof Error ? error.message : String(error)}`);
        }
      }

      if (!proxyString) {
        const errorMsg = '无法获取代理配置';
        logger.error(MODULE_NAME, errorMsg);
        throw new Error(errorMsg);
      }

      // 随机选择设备
      const { id: deviceId, name: deviceName } = await this.getRandomDevice();

      // 准备语言轮询列表
      const languages = languageRotation || ['ja', 'ja-JP'];
      const selectedLanguage = this.getRandomLanguage(languages);

      // 配置浏览器选项
      const browserOptions: BrowserOptions = {
        headless: true,
        launchOptions: {
          headless: true,
        },
        languageRotation: languages,
        proxy: proxyString, // 使用代理（固定代理或从 API 获取）
      };

      // 创建浏览器
      const { browser, page } = await createMobileBrowser(deviceId, browserOptions);

      // 设置 Referer（如果提供）
      if (referer && referer.trim() !== '') {
        await page.setExtraHTTPHeaders({
          Referer: referer,
        });
      }

      // 保存会话信息
      this.currentSession = {
        browser,
        page,
        deviceId,
        deviceName,
        startedAt: new Date(),
      };

      logger.info(
        MODULE_NAME,
        `浏览器已启动: 设备=${deviceName}, 语言=${selectedLanguage}, URL=${url}`
      );
      logger.info(MODULE_NAME, '开始加载页面，5秒后自动关闭浏览器...');

      // 开始加载页面（不等待加载完成）
      const gotoPromise = page.goto(url, {
        waitUntil: 'domcontentloaded', // 只等待 DOM 加载，不等待网络空闲
        timeout: 30000,
      }).catch((error) => {
        // 即使页面加载失败，也继续执行关闭逻辑
        logger.warn(MODULE_NAME, '页面加载过程中出现错误（将继续执行关闭逻辑）', error);
      });

      // 从开始加载算起，5秒后自动关闭浏览器
      setTimeout(async () => {
        try {
          logger.info(MODULE_NAME, '5秒时间到，自动关闭浏览器...');
          await this.closeBrowser();
          logger.info(MODULE_NAME, '浏览器已关闭');
        } catch (error) {
          logger.error(MODULE_NAME, '自动关闭浏览器时出错', error);
          // 确保释放锁
          this.releaseLock();
        }
      }, 5000);

      // 等待页面加载完成（但不影响关闭逻辑）
      await gotoPromise;
    } catch (error) {
      // 如果出错，释放锁
      this.releaseLock();
      throw error;
    }
  }

  /**
   * 关闭当前浏览器会话
   */
  async closeBrowser(): Promise<void> {
    if (this.currentSession) {
      try {
        await this.currentSession.browser.close();
      } catch (error) {
        logger.error(MODULE_NAME, '关闭浏览器时出错', error);
      }
      this.currentSession = null;
    }
    this.releaseLock();
  }

  /**
   * 获取浏览器状态
   */
  getStatus(): {
    isRunning: boolean;
    deviceName?: string;
    startedAt?: Date;
  } {
    if (this.currentSession) {
      return {
        isRunning: true,
        deviceName: this.currentSession.deviceName,
        startedAt: this.currentSession.startedAt,
      };
    }
    return {
      isRunning: false,
    };
  }
}

export const browserManager = BrowserManager.getInstance();

