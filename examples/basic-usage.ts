/**
 * 基本使用示例
 */

import { createMobileBrowser, getAllDevices } from '../src/index.js';

async function main() {
  // 获取所有可用设备
  const devices = await getAllDevices();
  console.log('可用设备:', devices.map((d) => d.name));

  // 使用设备 ID 1（数据库中的第一个设备）
  const { browser, context, page } = await createMobileBrowser('1', {
    headless: false,
  });

  try {
    // 导航到测试网站
    await page.goto('https://bot.sannysoft.com/');

    // 等待页面加载
    await page.waitForTimeout(3000);

    // 获取一些指纹信息进行验证
    const fingerprint = await page.evaluate(() => {
      return {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        languages: navigator.languages,
        hardwareConcurrency: navigator.hardwareConcurrency,
        maxTouchPoints: navigator.maxTouchPoints,
        deviceMemory: (navigator as any).deviceMemory,
        screenWidth: screen.width,
        screenHeight: screen.height,
        devicePixelRatio: window.devicePixelRatio,
        colorDepth: screen.colorDepth,
      };
    });

    console.log('设备指纹信息:');
    console.log(JSON.stringify(fingerprint, null, 2));

    // 保持浏览器打开一段时间以便观察
    await page.waitForTimeout(5000);
  } finally {
    await browser.close();
  }
}

main().catch(console.error);

