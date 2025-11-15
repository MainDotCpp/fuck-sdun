/**
 * 平台类型定义
 */

export type Platform = 'ios' | 'android';

export type BrowserEngine = 'webkit' | 'chromium';

/**
 * 获取平台对应的浏览器引擎
 */
export function getEngineForPlatform(platform: Platform): BrowserEngine {
  switch (platform) {
    case 'ios':
      return 'webkit';
    case 'android':
      return 'chromium';
    default:
      throw new Error(`Unsupported platform: ${platform}`);
  }
}

/**
 * 验证平台字符串是否有效
 */
export function isValidPlatform(platform: string): platform is Platform {
  return platform === 'ios' || platform === 'android';
}

