/**
 * 启动浏览器并访问指定网址
 */

import { createMobileBrowser } from './src/index.js';

async function main() {
  try {
    console.log('正在启动移动浏览器...');
    console.log('模式: 非无头模式（将显示浏览器窗口）');
    
    // 代理配置
    const proxy = 'sg.922s5.net:6300:30356354yT-zone-custom-region-JP-sessid-KFKFOZZc:OgUvBWs3';
    
    // 语言轮询列表
    const languageRotation = ['ja-JP', 'ja'];
    
    // 使用设备 ID 1（数据库中的第一个设备，通常是 iPhone）
    const { browser, page } = await createMobileBrowser('1', {  
      headless: false,
      launchOptions: {
        headless: false,
      },
      proxy: proxy,
      languageRotation: languageRotation,
    });
    
    console.log('代理配置:', proxy);
    console.log('语言轮询列表:', languageRotation);

    console.log('浏览器已启动');
    console.log('浏览器类型:', browser.browserType().name());
    console.log('正在访问 https://sdun.io/vQ95fE ...');
    
    // 访问指定网址
    await page.goto('https://sdun.io/vQ95fE', {
      waitUntil: 'networkidle',
      timeout: 30000,
    });

    console.log('页面加载完成！');
    console.log('页面标题:', await page.title());
    console.log('浏览器窗口应已显示，按 Ctrl+C 退出');

    // 保持浏览器打开 - 使用 process.stdin 来保持进程运行
    process.stdin.resume();
    
    // 监听退出信号
    process.on('SIGINT', async () => {
      console.log('\n正在关闭浏览器...');
      await browser.close();
      process.exit(0);
    });
  } catch (error) {
    console.error('发生错误:', error);
    if (error instanceof Error) {
      console.error('错误详情:', error.message);
      console.error('堆栈:', error.stack);
    }
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('未捕获的错误:', error);
  process.exit(1);
});

