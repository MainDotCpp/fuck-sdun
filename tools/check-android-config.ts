import { DatabaseAdapter } from '../src/database/database-adapter.js';

async function checkAndroidConfig() {
  const db = new DatabaseAdapter();
  
  try {
    const devices = await db.getAllDevices();
    const androidDevices = devices.filter(d => d.platform === 'android');
    
    console.log('Android 设备配置:');
    console.log(JSON.stringify(androidDevices, null, 2));
    
    // 检查是否有硬编码的值
    console.log('\n检查硬编码值:');
    androidDevices.forEach(device => {
      console.log(`\n设备: ${device.name} (ID: ${device.id})`);
      console.log(`  platform: ${device.system.platform}`);
      console.log(`  osVersion: ${device.system.osVersion}`);
      console.log(`  userAgent: ${device.browser.userAgent}`);
      console.log(`  browser.version: ${device.browser.version}`);
      console.log(`  browser.vendor: ${device.browser.vendor}`);
    });
  } catch (error) {
    console.error('错误:', error);
  } finally {
    await db.close();
  }
}

checkAndroidConfig();

