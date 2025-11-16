/**
 * 设备配置类型定义
 */

import type { Platform } from './platform';

/**
 * 硬件规格
 */
export interface HardwareSpec {
  /** CPU 核心数 */
  cpuCores: number;
  /** 设备内存（GB，iOS 设备可选，Android 设备必需） */
  memory?: number;
  /** 屏幕宽度（像素） */
  screenWidth: number;
  /** 屏幕高度（像素） */
  screenHeight: number;
  /** 设备像素比 */
  devicePixelRatio: number;
  /** 屏幕颜色深度（位） */
  colorDepth: number;
}

/**
 * 系统规格
 */
export interface SystemSpec {
  /** 操作系统版本 */
  osVersion: string;
  /** 平台架构 */
  platform: string;
  /** 时区 ID（可选，可通过代理IP动态设置） */
  timezoneId?: string;
  /** 语言代码（可选，可通过代理IP动态设置） */
  language?: string;
  /** 语言列表（可选，可通过代理IP动态设置） */
  languages?: string[];
}

/**
 * 浏览器规格
 */
export interface BrowserSpec {
  /** User-Agent 字符串 */
  userAgent: string;
  /** 浏览器版本 */
  version: string;
  /** 浏览器名称 */
  name: string;
  /** 浏览器厂商 */
  vendor: string;
  /** userAgentData (Client Hints API) - 从真机提取的完整数据 */
  userAgentData?: {
    platform?: string | null;
    brands?: Array<{ brand: string; version: string }>;
    mobile?: boolean | null;
    platformVersion?: string;
    model?: string;
    architecture?: string;
    bitness?: string;
    fullVersion?: string;
    fullVersionList?: Array<{ brand: string; version: string }>;
    uaFullVersion?: string;
    wow64?: boolean;
  };
}

/**
 * 指纹规格
 */
export interface FingerprintSpec {
  /** Navigator 设备内存（GB，iOS 为 undefined） */
  deviceMemory?: number;
  /** 硬件并发数 */
  hardwareConcurrency: number;
  /** 最大触摸点数 */
  maxTouchPoints: number;
  /** WebGL 渲染器 */
  webglRenderer?: string;
  /** WebGL 厂商 */
  webglVendor?: string;
  /** Canvas 噪声种子（用于生成一致的 Canvas 指纹） */
  canvasNoise?: number;
  /** AudioContext 指纹种子 */
  audioContextSeed?: number;
  /** 连接类型 */
  connectionType?: string;
  /** 连接有效类型 */
  effectiveType?: string;
  /** 下行速度（Mbps） */
  downlink?: number | null;
  /** 往返时间（ms） */
  rtt?: number | null;
}

/**
 * 设备配置
 */
export interface DeviceProfile {
  /** 设备唯一标识 */
  id: string;
  /** 设备名称 */
  name: string;
  /** 平台类型 */
  platform: Platform;
  /** 硬件参数 */
  hardware: HardwareSpec;
  /** 系统参数 */
  system: SystemSpec;
  /** 浏览器参数 */
  browser: BrowserSpec;
  /** 指纹参数 */
  fingerprint: FingerprintSpec;
}

/**
 * 验证设备配置的完整性
 */
export function validateDeviceProfile(device: DeviceProfile): void {
  // 验证必填字段
  if (!device.id) {
    throw new Error('Device profile must have an id');
  }
  if (!device.name) {
    throw new Error('Device profile must have a name');
  }
  if (!device.platform) {
    throw new Error('Device profile must have a platform');
  }

  // 验证平台类型
  if (device.platform !== 'ios' && device.platform !== 'android') {
    throw new Error(`Invalid platform: ${device.platform}. Must be 'ios' or 'android'`);
  }

  // 验证硬件参数
  if (!device.hardware) {
    throw new Error('Device profile must have hardware specification');
  }
  if (device.hardware.screenWidth <= 0 || device.hardware.screenHeight <= 0) {
    throw new Error('Invalid screen dimensions');
  }

  // 验证系统参数
  if (!device.system) {
    throw new Error('Device profile must have system specification');
  }
  // 时区和语言现在是可选的，可以通过代理IP动态设置

  // 验证浏览器参数
  if (!device.browser) {
    throw new Error('Device profile must have browser specification');
  }
  if (!device.browser.userAgent) {
    throw new Error('Device profile must have user agent');
  }

  // 验证指纹参数
  if (!device.fingerprint) {
    throw new Error('Device profile must have fingerprint specification');
  }

  // iOS 特定验证
  if (device.platform === 'ios') {
    if (device.fingerprint.deviceMemory !== undefined) {
      throw new Error('iOS devices must not have deviceMemory defined');
    }
  }

  // Android 特定验证
  if (device.platform === 'android') {
    if (device.fingerprint.deviceMemory === undefined) {
      throw new Error('Android devices should have deviceMemory defined');
    }
  }

  // 验证一致性：屏幕尺寸与视口应该匹配
  // 这个验证会在实际使用时进行
}

