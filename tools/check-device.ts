/**
 * 检查设备配置
 */

import { DatabaseAdapter } from '../src/database/database-adapter.js';

async function checkDevice(id: number) {
  const db = new DatabaseAdapter();
  
  try {
    const device = await db.getDeviceById(id);
    if (!device) {
      console.log(`设备 ID ${id} 不存在`);
      return;
    }
    
    console.log('设备配置:');
    console.log(JSON.stringify(device, null, 2));
    
    // 检查 User-Agent 中的 Android 版本
    const ua = device.browser.userAgent;
    const androidMatch = ua.match(/\bAndroid\s+(\d+)(?:[._](\d+))?/i);
    if (androidMatch) {
      console.log('\nUser-Agent 中的 Android 版本:', androidMatch[1] + (androidMatch[2] ? '.' + androidMatch[2] : ''));
    }
    console.log('配置中的 osVersion:', device.system.osVersion);
    
    // 检查是否一致
    if (androidMatch && device.system.osVersion !== androidMatch[1]) {
      console.log('\n⚠️  警告: User-Agent 中的 Android 版本与配置中的 osVersion 不一致！');
    }
  } catch (error) {
    console.error('错误:', error);
  } finally {
    await db.close();
  }
}

const id = parseInt(process.argv[2] || '8', 10);
checkDevice(id);

