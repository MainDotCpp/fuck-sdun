/**
 * 922proxy ISP 代理服务
 * 用于从 922proxy API 获取代理配置
 */

import { logger } from '../utils/logger';
import { PROXY_CONFIG, getRandomJapanCity } from '../config/proxy-config';

const MODULE_NAME = 'ProxyService';

export interface ProxyConfig {
  /** 代理服务器地址（格式：host:port:username:password） */
  proxyString: string;
  /** 解析后的代理配置 */
  parsed: {
    server: string;
    username: string;
    password: string;
  };
}

export interface ProxyServiceConfig {
  /** API Token */
  token: string;
  /** API Key */
  key: string;
  /** 用户名 */
  username: string;
  /** 国家地区 */
  country: string;
  /** 城市 */
  city: string;
  /** 主机名：端口（例如：Singapore、Europe、United States） */
  hostname: string;
  /** API 地址（可选，默认官方地址） */
  apiUrl?: string;
}

export class ProxyService {
  private config: ProxyServiceConfig;

  constructor(config: ProxyServiceConfig) {
    this.config = {
      ...config,
      apiUrl: config.apiUrl || 'https://docapi.922proxy.com/api/proxy/isp_generate',
    };
  }

  /**
   * 创建默认配置的 ProxyService 实例（日本+随机城市）
   */
  static createDefault(): ProxyService | null {
    // 检查配置是否完整（检查是否为默认占位符值）
    const token = PROXY_CONFIG.token as string;
    const key = PROXY_CONFIG.key as string;
    const username = PROXY_CONFIG.username as string;
    
    if (
      token === 'your_token_here' ||
      key === 'your_key_here' ||
      username === 'your_username_here' ||
      !token ||
      !key ||
      !username
    ) {
      logger.warn(
        MODULE_NAME,
        '922proxy 配置未设置，请在 src/config/proxy-config.ts 中配置 token、key 和 username'
      );
      return null;
    }

    // 随机选择一个日本城市
    const city = getRandomJapanCity();

    return new ProxyService({
      token: PROXY_CONFIG.token,
      key: PROXY_CONFIG.key,
      username: PROXY_CONFIG.username,
      country: PROXY_CONFIG.country,
      city,
      hostname: PROXY_CONFIG.hostname,
      apiUrl: PROXY_CONFIG.apiUrl,
    });
  }

  /**
   * 从环境变量创建 ProxyService 实例（保留用于兼容性）
   */
  static fromEnv(): ProxyService | null {
    const token = process.env.PROXY_922_TOKEN;
    const key = process.env.PROXY_922_KEY;
    const username = process.env.PROXY_922_USERNAME;
    const country = process.env.PROXY_922_COUNTRY;
    const city = process.env.PROXY_922_CITY;
    const hostname = process.env.PROXY_922_HOSTNAME;

    if (!token || !key || !username || !country || !city || !hostname) {
      logger.warn(
        MODULE_NAME,
        '922proxy 配置不完整，跳过代理获取。需要环境变量: PROXY_922_TOKEN, PROXY_922_KEY, PROXY_922_USERNAME, PROXY_922_COUNTRY, PROXY_922_CITY, PROXY_922_HOSTNAME'
      );
      return null;
    }

    return new ProxyService({
      token,
      key,
      username,
      country,
      city,
      hostname,
    });
  }

  /**
   * 解析代理字符串
   * 格式：host:port:username:password
   */
  private parseProxyString(proxyString: string): {
    server: string;
    username: string;
    password: string;
  } {
    const parts = proxyString.split(':');
    if (parts.length !== 4) {
      throw new Error(`无效的代理格式: ${proxyString}，期望格式: host:port:username:password`);
    }

    const [host, port, username, password] = parts;
    return {
      server: `http://${host}:${port}`,
      username,
      password,
    };
  }

  /**
   * 获取一条代理
   */
  async getProxy(): Promise<ProxyConfig> {
    const requestBody = {
      username: this.config.username,
      country: this.config.country,
      city: this.config.city,
      count: '1', // 只获取一条代理
      hostname: this.config.hostname,
      format: '1', // 格式：hostname:port:username:password
    };

    try {
      logger.info(
        MODULE_NAME,
        `正在从 922proxy 获取代理 (国家: ${this.config.country}, 城市: ${this.config.city}, 主机名: ${this.config.hostname})...`
      );
      logger.debug(MODULE_NAME, `请求参数: ${JSON.stringify(requestBody, null, 2)}`);

      // 注意：根据 922proxy 文档，token 和 key 应该在 Header 中
      // 但某些 API 可能需要不同的格式，这里先尝试标准格式
      const response = await fetch(this.config.apiUrl!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: this.config.token,
          key: this.config.key,
        },
        body: JSON.stringify(requestBody),
      });

      logger.debug(MODULE_NAME, `API 响应状态: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        const errorText = await response.text();
        logger.error(
          MODULE_NAME,
          `API 请求失败: ${response.status} ${response.statusText}`,
          new Error(errorText)
        );
        throw new Error(`922proxy API 请求失败: ${response.status} ${response.statusText}, ${errorText}`);
      }

      const result = await response.json();
      logger.debug(MODULE_NAME, `API 响应数据: ${JSON.stringify(result, null, 2)}`);

      if (result.code !== 'success') {
        const errorMsg = `922proxy API 返回错误: ${result.msg || '未知错误'}`;
        logger.error(MODULE_NAME, errorMsg);
        throw new Error(errorMsg);
      }

      if (!result.data || !Array.isArray(result.data) || result.data.length === 0) {
        const errorMsg = '922proxy API 返回空数据';
        logger.error(MODULE_NAME, errorMsg);
        throw new Error(errorMsg);
      }

      // 获取第一条代理
      const proxyString = result.data[0];
      const parsed = this.parseProxyString(proxyString);

      logger.info(MODULE_NAME, `成功获取代理: ${parsed.server}`);

      return {
        proxyString,
        parsed,
      };
    } catch (error) {
      // 如果是网络错误或其他错误，记录详细信息
      if (error instanceof TypeError && error.message.includes('fetch')) {
        logger.error(MODULE_NAME, '网络请求失败，请检查网络连接或 API URL', error);
      } else if (error instanceof Error) {
        logger.error(MODULE_NAME, '获取代理失败', error);
      } else {
        logger.error(MODULE_NAME, '获取代理失败', new Error(String(error)));
      }
      throw error;
    }
  }
}

