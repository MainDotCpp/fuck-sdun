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
  // 待访问的目标网址（用于限制多人使用：后到达的请求会覆盖先到达的请求）
  private pendingUrl: string | null = null;
  // 待设置的 Referer（用于限制多人使用）
  private pendingReferer: string | undefined = undefined;
  // 待使用的语言轮询列表（用于限制多人使用）
  private pendingLanguageRotation: string[] | undefined = undefined;

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
   * 设置待访问的目标网址（用于限制多人使用）
   * 后到达的请求会覆盖先到达的请求的目标网址
   * @param url 目标网址
   * @param referer Referer 头（可选）
   * @param languageRotation 语言轮询列表（可选）
   */
  setPendingRequest(url: string, referer?: string, languageRotation?: string[]): void {
    this.pendingUrl = url;
    this.pendingReferer = referer;
    this.pendingLanguageRotation = languageRotation;
    logger.info(MODULE_NAME, `已更新待访问网址: ${url}${referer ? `, Referer: ${referer}` : ''}`);
  }

  /**
   * 获取并清除待访问的目标网址
   * @returns 待访问的目标网址和相关信息
   */
  private getAndClearPendingRequest(): {
    url: string;
    referer?: string;
    languageRotation?: string[];
  } | null {
    if (!this.pendingUrl) {
      return null;
    }
    const result = {
      url: this.pendingUrl,
      referer: this.pendingReferer,
      languageRotation: this.pendingLanguageRotation,
    };
    // 清除待访问信息
    this.pendingUrl = null;
    this.pendingReferer = undefined;
    this.pendingLanguageRotation = undefined;
    return result;
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
   * 注意：实际访问的网址是从 pendingUrl 读取的（用于限制多人使用）
   * @param url 目标网址（已废弃，保留用于兼容性，实际使用 pendingUrl）
   * @param referer Referer 头（已废弃，保留用于兼容性，实际使用 pendingReferer）
   * @param languageRotation 语言轮询列表（已废弃，保留用于兼容性，实际使用 pendingLanguageRotation）
   */
  async startBrowser(
    url?: string,
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
      const randomDelay = Math.floor(Math.random() * (25000 - 15000 + 1)) + 5000; // 15-25秒随机延迟
      logger.info(MODULE_NAME, `设备初始化中，预计等待 ${Math.round(randomDelay / 1000)} 秒...`);
      await new Promise(resolve => setTimeout(resolve, randomDelay));

      // 延迟结束后，获取最新的待访问网址（用于限制多人使用：后到达的请求会覆盖先到达的请求）
      const pendingRequest = this.getAndClearPendingRequest();
      if (!pendingRequest) {
        throw new Error('没有待访问的目标网址');
      }
      const actualUrl = pendingRequest.url;
      const actualReferer = pendingRequest.referer;
      const actualLanguageRotation = pendingRequest.languageRotation;

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

      // 获取设备平台以确定浏览器引擎
      const device = await this.db.getDeviceById(parseInt(deviceId));
      if (!device) {
        throw new Error(`设备 ${deviceId} 不存在`);
      }
      const platform = device.platform;
      const isWebKit = platform === 'ios'; // iOS 使用 WebKit，Android 使用 Chromium

      // 准备语言轮询列表（使用最新的待访问请求中的语言轮询列表）
      const languages = actualLanguageRotation || languageRotation || ['ja', 'ja-JP'];
      const selectedLanguage = this.getRandomLanguage(languages);

      // 配置浏览器选项
      // WebKit (iOS) 不支持 'new' headless 模式，只能使用 true/false
      // Chromium (Android) 支持 'new' headless 模式，更难被检测
      const headlessMode = isWebKit ? true : 'new'; // WebKit 使用 true，Chromium 使用 'new'
      const browserOptions: BrowserOptions = {
        headless: headlessMode,
        launchOptions: {
          headless: headlessMode as any, // WebKit 不支持 'new'，但 Chromium 支持
        },
        languageRotation: languages,
        proxy: proxyString, // 使用代理（固定代理或从 API 获取）
      };
      
      logger.info(MODULE_NAME, `浏览器引擎: ${isWebKit ? 'WebKit (iOS)' : 'Chromium (Android)'}, Headless 模式: ${headlessMode}`);

      // 记录环境信息（用于对比本地和服务器差异）
      const envInfo = {
        nodeEnv: process.env.NODE_ENV || 'development',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        locale: Intl.DateTimeFormat().resolvedOptions().locale,
        platform: process.platform,
        arch: process.arch,
        proxy: proxyString ? `${proxyString.split(':')[0]}:${proxyString.split(':')[1]}` : 'none',
      };
      logger.info(MODULE_NAME, `环境信息: ${JSON.stringify(envInfo, null, 2)}`);

      // 创建浏览器
      const { browser, page } = await createMobileBrowser(deviceId, browserOptions);

      // device 已在上面获取，这里直接使用

      // 检测实际出口 IP（用于验证代理是否生效）
      try {
        const ipCheckResponse = await page.goto('https://api.ipify.org?format=json', {
          waitUntil: 'networkidle',
          timeout: 10000,
        }).catch(() => null);
        
        if (ipCheckResponse) {
          const ipInfo = await page.evaluate(() => {
            return document.body.textContent;
          }).catch(() => null);
          
          if (ipInfo) {
            try {
              const ipData = JSON.parse(ipInfo);
              logger.info(MODULE_NAME, `实际出口 IP: ${ipData.ip || '无法获取'}`);
              
              // 检查 IP 是否与代理匹配
              const proxyHost = proxyString.split(':')[0];
              if (ipData.ip && !ipData.ip.includes(proxyHost.split('.')[0])) {
                logger.warn(MODULE_NAME, `警告：出口 IP (${ipData.ip}) 可能与代理不匹配`);
              }
            } catch (e) {
              logger.debug(MODULE_NAME, '无法解析 IP 信息', e);
            }
          }
        }
      } catch (error) {
        logger.debug(MODULE_NAME, 'IP 检测失败（不影响主流程）', error);
      }

      // 构建真实的 HTTP 请求头（模拟真实移动浏览器）
      const headers: Record<string, string> = {
        // 基础请求头
        'Accept': device.platform === 'ios' 
          ? 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
          : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': selectedLanguage + ',' + languages.join(',') + ';q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Cache-Control': 'max-age=0',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
      };

      // 添加 Referer（如果提供）
      const finalReferer = actualReferer || referer;
      if (finalReferer && finalReferer.trim() !== '') {
        headers['Referer'] = finalReferer;
        headers['Sec-Fetch-Site'] = 'cross-site';
      }

      // iOS Safari 特定的请求头
      if (device.platform === 'ios') {
        // iOS Safari 不使用 Sec-CH-UA（这是 Chrome 的特性）
        // 但为了兼容性，可以添加
        headers['Sec-CH-UA-Mobile'] = '?1';
        headers['Sec-CH-UA-Platform'] = '"iOS"';
        // iOS Safari 不使用 Sec-CH-UA，移除它以避免被检测
        delete headers['Sec-CH-UA'];
      } else {
        // Android Chrome 特定的请求头
        headers['Sec-CH-UA'] = `"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"`;
        headers['Sec-CH-UA-Mobile'] = '?1';
        headers['Sec-CH-UA-Platform'] = '"Android"';
      }

      // 设置请求头
      await page.setExtraHTTPHeaders(headers);
      
      logger.info(MODULE_NAME, `已设置 HTTP 请求头: ${Object.keys(headers).join(', ')}`);
      logger.debug(MODULE_NAME, `请求头详情: ${JSON.stringify(headers, null, 2)}`);

      // 监听所有请求，记录请求头（用于调试代理检测问题）
      page.on('request', (request) => {
        const url = request.url();
        if (url === actualUrl || url.includes(new URL(actualUrl).hostname)) {
          const requestHeaders = request.headers();
          logger.debug(MODULE_NAME, `实际发送的请求头: ${JSON.stringify(requestHeaders, null, 2)}`);
        }
      });

      // 应用增强的反检测脚本（针对 Cloudflare，特别是 headless 检测）
      // WebKit (iOS Safari) 和 Chromium (Android Chrome) 都需要这些检测绕过
      await page.addInitScript(() => {
        // 1. 移除 webdriver 标识（关键：headless 检测的核心）
        // WebKit 和 Chromium 都需要移除这个标识
        Object.defineProperty(navigator, 'webdriver', {
          get: () => undefined,
          configurable: true,
        });
        
        // 2. 覆盖 Chrome 自动化标识（仅 Chromium 需要，WebKit 没有 chrome 对象）
        // 但为了兼容性，检查是否存在再覆盖
        if ((window as any).chrome) {
          Object.defineProperty(window, 'chrome', {
            get: () => ({
              runtime: {},
              loadTimes: function() {},
              csi: function() {},
              app: {},
            }),
            configurable: true,
          });
        }
        
        // 2b. WebKit (Safari) 特定的检测绕过
        // Safari 没有 chrome 对象，但可能有其他自动化标识
        if (!(window as any).chrome && (navigator as any).vendor && (navigator as any).vendor.includes('Apple')) {
          // Safari 特定的检测绕过
          // 确保 navigator.standalone 存在（iOS Safari 特有）
          if (typeof (navigator as any).standalone === 'undefined') {
            Object.defineProperty(navigator, 'standalone', {
              get: () => false,
              configurable: true,
            });
          }
        }
        
        // 3. 覆盖 permissions API（headless 模式下可能不同）
        const originalQuery = window.navigator.permissions.query;
        window.navigator.permissions.query = (parameters: any) =>
          parameters.name === 'notifications'
            ? Promise.resolve({ state: Notification.permission } as PermissionStatus)
            : originalQuery(parameters);
        
        // 4. 覆盖 plugins（避免空数组被检测）
        if (navigator.plugins.length === 0) {
          Object.defineProperty(navigator, 'plugins', {
            get: () => {
              const plugins = [];
              for (let i = 0; i < 3; i++) {
                plugins.push({
                  name: `Plugin ${i}`,
                  description: 'Plugin description',
                  filename: 'plugin.dll',
                });
              }
              return plugins;
            },
            configurable: true,
          });
        }
        
        // 5. 覆盖 languages（使用真实值，已在指纹注入中设置）
        // 这里不再覆盖，使用指纹注入中的值
        
        // 6. 移除自动化相关的属性
        delete (window as any).navigator.__proto__.webdriver;
        delete (window as any).__playwright;
        delete (window as any).__pw_manual;
        delete (window as any).__playwright_evaluation__;
        
        // 7. 覆盖 iframe 检测
        const originalToString = Function.prototype.toString;
        Function.prototype.toString = function() {
          if (this === (navigator as any).getBattery) {
            return 'function getBattery() { [native code] }';
          }
          return originalToString.call(this);
        };
        
        // 8. 覆盖 toString 方法，隐藏函数修改痕迹
        const getParameter = WebGLRenderingContext.prototype.getParameter;
        WebGLRenderingContext.prototype.getParameter = function(parameter: number) {
          if (parameter === 37445) {
            return 'Intel Inc.';
          }
          if (parameter === 37446) {
            return 'Intel Iris OpenGL Engine';
          }
          return getParameter.call(this, parameter);
        };
        
        // 9. 覆盖 console.debug，避免检测脚本发现调试信息
        const originalDebug = console.debug;
        console.debug = () => {};
        
        // 10. 模拟真实的鼠标和键盘事件
        const originalAddEventListener = EventTarget.prototype.addEventListener;
        EventTarget.prototype.addEventListener = function(
          type: string,
          listener: any,
          options?: any
        ) {
          // 如果是检测相关的事件，延迟触发
          if (type === 'mousemove' || type === 'keydown') {
            setTimeout(() => {
              originalAddEventListener.call(this, type, listener, options);
            }, Math.random() * 100);
            return;
          }
          return originalAddEventListener.call(this, type, listener, options);
        };
        
        // 11. 【新增】模拟截图能力（绕过 Cloudflare 的截图检测）
        // Cloudflare 会检测浏览器是否支持截图，headless 模式下可能不支持
        // 通过覆盖相关 API 来模拟支持截图
        if (typeof (window as any).chrome !== 'undefined' && (window as any).chrome.runtime) {
          // 确保 chrome.runtime 存在，表明浏览器支持扩展（间接表明支持截图）
          Object.defineProperty((window as any).chrome, 'runtime', {
            get: () => ({
              onConnect: undefined,
              onMessage: undefined,
            }),
            configurable: true,
          });
        }
        
        // 12. 【新增】覆盖 document.documentElement 的某些属性（headless 检测）
        // 某些检测脚本会检查 document.documentElement 的属性
        const originalGetAttribute = Element.prototype.getAttribute;
        Element.prototype.getAttribute = function(name: string) {
          // 如果检测脚本尝试获取某些特殊属性，返回正常值
          return originalGetAttribute.call(this, name);
        };
        
        // 13. 【新增】覆盖 window.outerHeight 和 window.outerWidth（headless 检测）
        // headless 模式下这些值可能为 0
        if (window.outerHeight === 0 || window.outerWidth === 0) {
          Object.defineProperty(window, 'outerHeight', {
            get: () => window.innerHeight || 844,
            configurable: true,
          });
          Object.defineProperty(window, 'outerWidth', {
            get: () => window.innerWidth || 390,
            configurable: true,
          });
        }
        
        // 14. 【新增】覆盖 Notification API（headless 检测）
        // 某些检测脚本会检查 Notification 权限
        if (Notification.permission === 'denied') {
          Object.defineProperty(Notification, 'permission', {
            get: () => 'default',
            configurable: true,
          });
        }
        
        // 15. 【新增】移除 CDP 相关标识
        // Chrome DevTools Protocol 标识可能暴露自动化
        Object.keys(window).forEach(key => {
          if (key.toLowerCase().includes('cdp') || 
              key.toLowerCase().includes('devtools') ||
              key.toLowerCase().includes('__playwright') ||
              key.toLowerCase().includes('__pw')) {
            try {
              delete (window as any)[key];
            } catch (e) {
              // 忽略无法删除的属性
            }
          }
        });
      });
      
      logger.info(MODULE_NAME, '已应用增强的反检测脚本（针对 Cloudflare）');

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
        `浏览器已启动: 设备=${deviceName}, 语言=${selectedLanguage}, URL=${actualUrl}${finalReferer ? `, Referer=${finalReferer}` : ''}`
      );

      // 监听页面事件以获取更多信息
      const pageEvents: {
        loaded: boolean;
        responseReceived: boolean;
        responseStatus?: number;
        finalUrl?: string;
        pageTitle?: string;
        errors: string[];
        warnings: string[];
        networkRequests: Array<{ url: string; method: string; status?: number }>;
      } = {
        loaded: false,
        responseReceived: false,
        errors: [],
        warnings: [],
        networkRequests: [],
      };

      // 监听控制台消息
      page.on('console', (msg) => {
        const text = msg.text();
        if (msg.type() === 'error') {
          pageEvents.errors.push(text);
          logger.warn(MODULE_NAME, `页面控制台错误: ${text}`);
        } else if (msg.type() === 'warning') {
          pageEvents.warnings.push(text);
          logger.debug(MODULE_NAME, `页面控制台警告: ${text}`);
        }
      });

      // 监听页面响应
      page.on('response', (response) => {
        const url = response.url();
        const status = response.status();
        const method = response.request().method();
        
        pageEvents.responseReceived = true;
        pageEvents.responseStatus = status;
        pageEvents.networkRequests.push({ url, method, status });
        
        // 记录主请求的响应
        if (url === actualUrl || url.includes(new URL(actualUrl).hostname)) {
          logger.info(MODULE_NAME, `收到页面响应: ${method} ${url} -> ${status}`);
        }
      });

      // 监听页面请求
      page.on('request', (request) => {
        const url = request.url();
        const method = request.method();
        pageEvents.networkRequests.push({ url, method });
        logger.debug(MODULE_NAME, `页面请求: ${method} ${url}`);
      });

      // 监听页面加载完成
      page.on('load', () => {
        pageEvents.loaded = true;
        logger.info(MODULE_NAME, '页面 load 事件触发');
      });

      logger.info(MODULE_NAME, '开始加载页面，15秒后自动关闭浏览器...');
      const startTime = Date.now();

      // 开始加载页面（不等待加载完成，使用最新的待访问请求中的网址）
      // 对于 Cloudflare 保护的网站，需要等待更长时间以完成挑战
      // 增加超时时间以应对 Cloudflare 挑战
      const gotoPromise = page.goto(actualUrl, {
        waitUntil: 'domcontentloaded', // 只等待 DOM 加载，不等待网络空闲
        timeout: 60000, // 增加到 60 秒以应对 Cloudflare 挑战
      })
        .then(async (response) => {
          const loadTime = Date.now() - startTime;
          const finalUrl = page.url();
          const pageTitle = await page.title().catch(() => '无法获取标题');
          
          pageEvents.finalUrl = finalUrl;
          pageEvents.pageTitle = pageTitle;
          pageEvents.loaded = true;
          
          logger.info(
            MODULE_NAME,
            `页面加载成功: 状态码=${response?.status() || 'N/A'}, 耗时=${loadTime}ms, 最终URL=${finalUrl}, 标题=${pageTitle}`
          );
          
          // 检查是否被重定向
          if (finalUrl !== actualUrl) {
            logger.info(MODULE_NAME, `页面发生重定向: ${actualUrl} -> ${finalUrl}`);
          }
          
          return response;
        })
        .catch(async (error) => {
          const loadTime = Date.now() - startTime;
          let finalUrl: string;
          let pageTitle: string;
          
          try {
            finalUrl = page.url();
            pageTitle = await page.title();
          } catch (e) {
            finalUrl = '无法获取URL';
            pageTitle = '无法获取标题';
          }
          
          pageEvents.finalUrl = finalUrl;
          pageEvents.pageTitle = pageTitle;
          
          logger.error(
            MODULE_NAME,
            `页面加载失败: 耗时=${loadTime}ms, 最终URL=${finalUrl}, 标题=${pageTitle}`,
            error
          );
          
          // 记录详细的错误信息
          if (error.message) {
            logger.error(MODULE_NAME, `错误详情: ${error.message}`);
          }
          
          // 即使页面加载失败，也继续执行关闭逻辑（不抛出错误）
          return null;
        });

      // 等待 Cloudflare 挑战完成（如果存在）
      // 检查页面是否包含 Cloudflare 挑战
      const checkCloudflareChallenge = async () => {
        try {
          // 等待页面加载
          await page.waitForLoadState('domcontentloaded', { timeout: 5000 }).catch(() => {});
          
          // 检查是否是 Cloudflare 挑战页面
          const isChallenge = await page.evaluate(() => {
            const bodyText = document.body?.innerText || '';
            const title = document.title || '';
            return (
              bodyText.includes('Checking your browser') ||
              bodyText.includes('Just a moment') ||
              bodyText.includes('DDoS protection by Cloudflare') ||
              title.includes('Just a moment') ||
              document.querySelector('#challenge-form') !== null ||
              document.querySelector('.cf-browser-verification') !== null
            );
          }).catch(() => false);

          if (isChallenge) {
            logger.info(MODULE_NAME, '检测到 Cloudflare 挑战，等待完成...');
            // 等待挑战完成（最多等待 15 秒）
            await page.waitForFunction(
              () => {
                const bodyText = document.body?.innerText || '';
                return !(
                  bodyText.includes('Checking your browser') ||
                  bodyText.includes('Just a moment') ||
                  bodyText.includes('DDoS protection by Cloudflare')
                );
              },
              { timeout: 15000 }
            ).catch(() => {
              logger.warn(MODULE_NAME, 'Cloudflare 挑战等待超时，继续执行...');
            });
            logger.info(MODULE_NAME, 'Cloudflare 挑战已完成或超时');
          }
        } catch (error) {
          logger.debug(MODULE_NAME, '检查 Cloudflare 挑战时出错', error);
        }
      };

      // 在页面加载后检查 Cloudflare 挑战
      gotoPromise.then(() => {
        checkCloudflareChallenge();
      }).catch(() => {
        // 即使加载失败也尝试检查
        checkCloudflareChallenge();
      });

      // 从开始加载算起，15秒后自动关闭浏览器
      setTimeout(async () => {
        try {
          const elapsedTime = Date.now() - startTime;
          
          // 汇总页面加载信息
          logger.info(MODULE_NAME, '='.repeat(60));
          logger.info(MODULE_NAME, '页面访问摘要:');
          logger.info(MODULE_NAME, `  目标URL: ${actualUrl}`);
          logger.info(MODULE_NAME, `  最终URL: ${pageEvents.finalUrl || '未获取到'}`);
          logger.info(MODULE_NAME, `  页面标题: ${pageEvents.pageTitle || '未获取到'}`);
          logger.info(MODULE_NAME, `  是否收到响应: ${pageEvents.responseReceived ? '是' : '否'}`);
          logger.info(MODULE_NAME, `  响应状态码: ${pageEvents.responseStatus || 'N/A'}`);
          logger.info(MODULE_NAME, `  是否触发load事件: ${pageEvents.loaded ? '是' : '否'}`);
          logger.info(MODULE_NAME, `  网络请求数: ${pageEvents.networkRequests.length}`);
          logger.info(MODULE_NAME, `  控制台错误数: ${pageEvents.errors.length}`);
          logger.info(MODULE_NAME, `  控制台警告数: ${pageEvents.warnings.length}`);
          logger.info(MODULE_NAME, `  总耗时: ${elapsedTime}ms`);
          
          // 记录前几个网络请求（最多5个）
          if (pageEvents.networkRequests.length > 0) {
            logger.info(MODULE_NAME, '  主要网络请求:');
            pageEvents.networkRequests.slice(0, 5).forEach((req, index) => {
              logger.info(MODULE_NAME, `    ${index + 1}. ${req.method} ${req.url} ${req.status ? `-> ${req.status}` : ''}`);
            });
          }
          
          // 记录控制台错误（如果有）
          if (pageEvents.errors.length > 0) {
            logger.warn(MODULE_NAME, '  控制台错误:');
            pageEvents.errors.slice(0, 3).forEach((err, index) => {
              logger.warn(MODULE_NAME, `    ${index + 1}. ${err}`);
            });
          }
          
          logger.info(MODULE_NAME, '='.repeat(60));
          logger.info(MODULE_NAME, '15秒时间到，自动关闭浏览器...');
          
          await this.closeBrowser();
          logger.info(MODULE_NAME, '浏览器已关闭');
        } catch (error) {
          logger.error(MODULE_NAME, '自动关闭浏览器时出错', error);
          // 确保释放锁
          this.releaseLock();
        }
      }, 15000); // 修复：改为 5000 毫秒（5秒）

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

