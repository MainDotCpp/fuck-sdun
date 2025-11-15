/**
 * 使用动态时区和语言设置的示例
 */

import { createMobileBrowser } from '../src/index.js';

async function main() {
  console.log('示例1: 使用默认设置（如果没有配置则使用 UTC/en-US）');
  const { browser: browser1, page: page1 } = await createMobileBrowser('iphone', {
    headless: false,
  });
  
  try {
    await page1.goto('https://example.com');
    const locale1 = await page1.evaluate(() => ({
      language: navigator.language,
      languages: navigator.languages,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }));
    console.log('默认设置:', locale1);
    await browser1.close();
  } catch (error) {
    await browser1.close();
    throw error;
  }

  console.log('\n示例2: 使用美国代理IP，设置美国时区和语言');
  const { browser: browser2, page: page2 } = await createMobileBrowser('iphone', {
    headless: false,
    timezoneId: 'America/New_York',
    language: 'en-US',
    languages: ['en-US', 'en'],
  });
  
  try {
    await page2.goto('https://example.com');
    const locale2 = await page2.evaluate(() => ({
      language: navigator.language,
      languages: navigator.languages,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }));
    console.log('美国设置:', locale2);
    await browser2.close();
  } catch (error) {
    await browser2.close();
    throw error;
  }

  console.log('\n示例3: 使用日本代理IP，设置日本时区和语言');
  const { browser: browser3, page: page3 } = await createMobileBrowser('iphone', {
    headless: false,
    timezoneId: 'Asia/Tokyo',
    language: 'ja-JP',
    languages: ['ja-JP', 'ja'],
  });
  
  try {
    await page3.goto('https://example.com');
    const locale3 = await page3.evaluate(() => ({
      language: navigator.language,
      languages: navigator.languages,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }));
    console.log('日本设置:', locale3);
    await browser3.close();
  } catch (error) {
    await browser3.close();
    throw error;
  }

  console.log('\n示例4: 使用中国代理IP，设置中国时区和语言');
  const { browser: browser4, page: page4 } = await createMobileBrowser('iphone', {
    headless: false,
    timezoneId: 'Asia/Shanghai',
    language: 'zh-CN',
    languages: ['zh-CN', 'zh'],
  });
  
  try {
    await page4.goto('https://example.com');
    const locale4 = await page4.evaluate(() => ({
      language: navigator.language,
      languages: navigator.languages,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }));
    console.log('中国设置:', locale4);
    await browser4.close();
  } catch (error) {
    await browser4.close();
    throw error;
  }
}

main().catch(console.error);

