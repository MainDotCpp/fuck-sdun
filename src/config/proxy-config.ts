/**
 * 922proxy 代理配置
 * 硬编码在程序中，国家固定为日本，城市随机选择
 */

/**
 * 日本主要城市列表（用于随机选择）
 */
export const JAPAN_CITIES = [
  'Tokyo',
  'Osaka',
  'Yokohama',
  'Nagoya',
  'Sapporo',
  'Fukuoka',
  'Kobe',
  'Kyoto',
  'Kawasaki',
  'Saitama',
  'Hiroshima',
  'Sendai',
  'Chiba',
  'Kitakyushu',
  'Sakai',
  'Niigata',
  'Hamamatsu',
  'Kumamoto',
  'Sagamihara',
  'Shizuoka',
];

/**
 * 固定代理配置（格式：host:port:username:password）
 * 如果设置了此值，将直接使用此代理，不再调用 API
 * 设置为空字符串 '' 则禁用固定代理，使用 API 获取
 */
export const FIXED_PROXY = 'as.proxys5.net:6200:30356354-zone-custom-region-JP:nRNz4Tsx';

/**
 * 922proxy API 配置
 * 请在此处配置您的 922proxy 凭证（仅在未设置 FIXED_PROXY 时使用）
 */
export const PROXY_CONFIG = {
  /** API Token */
  token: '49d8d3b0-a8a7-419e-ada4-8afd27aecb9f',    
  /** API Key */
  key: 'sLPLLr5nhDPl',
  /** 用户名 */
  username: 'shengdunapi',
  /** 主机名：端口 */
  hostname: 'Singapore',
  /** API 地址 */
  apiUrl: 'https://docapi.922proxy.com/api/proxy/isp_generate',
  /** 国家（固定为日本） */
  country: 'Japan',
} as const;

/**
 * 随机选择一个日本城市
 */
export function getRandomJapanCity(): string {
  const randomIndex = Math.floor(Math.random() * JAPAN_CITIES.length);
  return JAPAN_CITIES[randomIndex];
}

