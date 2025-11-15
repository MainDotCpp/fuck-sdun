/**
 * 主入口文件
 */

import type { Browser, BrowserContext, Page } from 'playwright';
import { DeviceManager } from './managers/device-manager.js';
import { EngineAdapter } from './adapters/engine-adapter.js';
import { ContextConfigurator, type BrowserOptions } from './configurators/context-configurator.js';

export interface MobileBrowserResult {
  browser: Browser;
  context: BrowserContext;
  page: Page;
}

/**
 * 创建移动浏览器环境
 */
export async function createMobileBrowser(
  deviceId: string,
  options?: BrowserOptions
): Promise<MobileBrowserResult> {
  // 1. 加载设备配置
  const deviceManager = new DeviceManager();
  const device = await deviceManager.loadDevice(deviceId);

  // 2. 选择浏览器引擎并启动浏览器
  const engineAdapter = new EngineAdapter();
  const launchOptions = options?.launchOptions ? { ...options.launchOptions } : {};
  const browser = await engineAdapter.launchBrowser(device.platform, {
    headless: options?.headless ?? false,
    ...launchOptions,
  });

  try {
    // 3. 创建上下文并注入指纹
    const contextConfigurator = new ContextConfigurator();
    const context = await contextConfigurator.createContext(browser, device, options);

    // 4. 创建页面
    const page = await contextConfigurator.createPage(context);

    return {
      browser,
      context,
      page,
    };
  } catch (error) {
    // 如果创建上下文或页面失败，关闭浏览器
    await browser.close();
    throw error;
  }
}

// 导出类型和类
export type { DeviceProfile, Platform } from './types/index.js';
export { DeviceManager } from './managers/device-manager.js';
export { EngineAdapter } from './adapters/engine-adapter.js';
export { ContextConfigurator } from './configurators/context-configurator.js';
export { FingerprintInjector } from './injectors/fingerprint-injector.js';
export { IOSFingerprintStrategy } from './strategies/ios-strategy.js';
export { AndroidFingerprintStrategy } from './strategies/android-strategy.js';

// 导出设备数据
export {
  getAllDevices,
  getDeviceById,
  getDevicesByPlatform,
  closeDatabase,
} from './data/index.js';

// 导出数据库适配器
export { DatabaseAdapter } from './database/database-adapter.js';

