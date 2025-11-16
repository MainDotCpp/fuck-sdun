/**
 * 主入口文件
 */

import type { Browser, BrowserContext, Page } from 'playwright';
import { DeviceManager } from './managers/device-manager';
import { EngineAdapter } from './adapters/engine-adapter';
import { ContextConfigurator, type BrowserOptions } from './configurators/context-configurator';

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
  // 优先使用 launchOptions 中的 headless，否则使用 options.headless，最后 fallback 到 false
  const headlessValue = launchOptions.headless !== undefined 
    ? launchOptions.headless 
    : (options?.headless ?? false);
  const browser = await engineAdapter.launchBrowser(device.platform, {
    headless: headlessValue as any, // 支持 'new' 模式
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
export type { DeviceProfile, Platform } from './types/index';
export { DeviceManager } from './managers/device-manager';
export { EngineAdapter } from './adapters/engine-adapter';
export { ContextConfigurator } from './configurators/context-configurator';
export { FingerprintInjector } from './injectors/fingerprint-injector';
export { IOSFingerprintStrategy } from './strategies/ios-strategy';
export { AndroidFingerprintStrategy } from './strategies/android-strategy';

// 导出设备数据
export {
  getAllDevices,
  getDeviceById,
  getDevicesByPlatform,
  closeDatabase,
} from './data/index';

// 导出数据库适配器
export { DatabaseAdapter } from './database/database-adapter';

