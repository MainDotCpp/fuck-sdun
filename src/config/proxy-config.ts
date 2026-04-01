/**
 * 922proxy 代理配置
 * 支持多分组配置
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
 * 加拿大主要城市列表
 */
export const CANADA_CITIES = [
  'Toronto',
  'Vancouver',
  'Montreal',
  'Ottawa',
  'Calgary',
  'Edmonton',
  'Quebec City',
  'Winnipeg',
  'Hamilton',
  'Kitchener',
];

/**
 * 分组代理配置
 */
export const PROXY_GROUPS: Record<string, {
  fixedProxy?: string;
  languages?: string[]; // 分组特定的语言轮询列表
  config?: {
    token: string;
    key: string;
    username: string;
    hostname: string;
    apiUrl?: string;
    country: string;
    cities?: string[];
  }
}> = {
  'default': {
    fixedProxy: 'res.proxy-seller.com:10000:32c238a7930e612b:VkrHR09ZEvi1a2X7',
    languages: ['ja-JP', 'ja', 'en-US', 'en']
  },
  'japan-google': {
    fixedProxy: 'res.proxy-seller.com:10000:32c238a7930e612b:VkrHR09ZEvi1a2X7',
    languages: ['ja-JP', 'ja', 'ja-JP,ja;q=0.9,en-US;q=0.8,en;q=0.7']
  },
  'canada-facebook': {
    fixedProxy: 'ea.proxys5.net:6200:30356354-zone-custom-region-CA:nRNz4Tsx',
    // 目标受众：加拿大的台湾人。提供多种复合型语言组合以提高仿真度
    languages: [
      'zh-TW,zh;q=0.9,en-CA;q=0.8,en-US;q=0.7', // 1. 繁体核心型：中文首选，英文回退
      'zh-TW,en-CA;q=0.9',                      // 3. 移动端常用：中文+加英
      'zh-TW',
    ],
  },
  'taiwan': {
    fixedProxy: 'res.proxy-seller.com:10000:89317062452d2c4c:aR0BMAQVn1zxlUKf',
    languages: [
      'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
      'zh-TW,en-US;q=0.9',
      'zh-TW',
    ]
  }
};

/**
 * 随机选择一个城市
 */
export function getRandomCity(group: string = 'default'): string {
  const groupConfig = PROXY_GROUPS[group] || PROXY_GROUPS['default'];
  const cities = groupConfig.config?.cities || JAPAN_CITIES;
  const randomIndex = Math.floor(Math.random() * cities.length);
  return cities[randomIndex];
}

/**
 * 获取分组配置
 */
export function getProxyConfig(group: string = 'default') {
  return PROXY_GROUPS[group] || PROXY_GROUPS['default'];
}

// 为了向下兼容，保留旧的导出（指向 default 分组）
export const FIXED_PROXY = PROXY_GROUPS['default'].fixedProxy;
export const PROXY_CONFIG = PROXY_GROUPS['default'].config;
export function getRandomJapanCity(): string {
  return getRandomCity('default');
}

