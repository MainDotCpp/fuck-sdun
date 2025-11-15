/**
 * 测试 Android 策略生成的脚本
 */

import { DatabaseAdapter } from '../src/database/database-adapter.js';
import { AndroidFingerprintStrategy } from '../src/strategies/android-strategy.js';

async function test() {
  const db = new DatabaseAdapter();
  const device = await db.getDeviceById(8);
  
  if (!device) {
    console.log('设备不存在');
    return;
  }
  
  const strategy = new AndroidFingerprintStrategy();
  const script = strategy.generateScript(device);
  
  // 检查关键部分
  console.log('=== 检查 userAgentData 部分 ===');
  const uaMatch = script.match(/const ua = navigator\.userAgent;[\s\S]*?const androidVersion =/);
  if (uaMatch) {
    console.log('找到 UA 提取代码');
  }
  
  // 检查 platformVersion
  const platformVersionMatch = script.match(/platformVersion:\s*([^,}]+)/);
  if (platformVersionMatch) {
    console.log('platformVersion 值:', platformVersionMatch[1]);
  }
  
  // 检查 platform
  const platformMatch = script.match(/platform:\s*['"]([^'"]+)['"]/g);
  if (platformMatch) {
    console.log('platform 值:', platformMatch);
  }
  
  // 输出完整脚本（截取 userAgentData 部分）
  const userAgentDataStart = script.indexOf('// 处理 userAgentData');
  const userAgentDataEnd = script.indexOf('})();', userAgentDataStart) + 5;
  if (userAgentDataStart > -1) {
    console.log('\n=== userAgentData 代码片段 ===');
    console.log(script.substring(userAgentDataStart, userAgentDataEnd + 50));
  }
  
  await db.close();
}

test().catch(console.error);

