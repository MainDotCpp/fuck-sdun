/**
 * 测试 922proxy API 调用
 * 用于诊断代理获取失败的原因
 */

import { ProxyService } from '../src/services/proxy-service';
import { PROXY_CONFIG, getRandomJapanCity } from '../src/config/proxy-config';

async function testProxyAPI() {
  console.log('=== 922proxy API 测试 ===\n');

  // 1. 检查配置
  console.log('1. 检查配置:');
  console.log('   Token:', PROXY_CONFIG.token.substring(0, 10) + '...');
  console.log('   Key:', PROXY_CONFIG.key.substring(0, 10) + '...');
  console.log('   Username:', PROXY_CONFIG.username);
  console.log('   Country:', PROXY_CONFIG.country);
  console.log('   Hostname:', PROXY_CONFIG.hostname);
  console.log('   API URL:', PROXY_CONFIG.apiUrl);
  console.log('');

  // 2. 测试创建服务实例
  console.log('2. 创建 ProxyService 实例:');
  const proxyService = ProxyService.createDefault();
  if (!proxyService) {
    console.error('   ❌ 无法创建 ProxyService 实例（配置未设置）');
    return;
  }
  console.log('   ✅ ProxyService 实例创建成功');
  console.log('   随机选择的城市:', getRandomJapanCity());
  console.log('');

  // 3. 测试 API 调用
  console.log('3. 测试 API 调用:');
  try {
    const proxyConfig = await proxyService.getProxy();
    console.log('   ✅ 代理获取成功！');
    console.log('   代理字符串:', proxyConfig.proxyString);
    console.log('   服务器:', proxyConfig.parsed.server);
    console.log('   用户名:', proxyConfig.parsed.username);
    console.log('   密码:', proxyConfig.parsed.password.substring(0, 10) + '...');
  } catch (error) {
    console.error('   ❌ 代理获取失败:');
    if (error instanceof Error) {
      console.error('   错误消息:', error.message);
      console.error('   错误堆栈:', error.stack);
    } else {
      console.error('   错误:', error);
    }

    // 4. 详细调试信息
    console.log('\n4. 详细调试信息:');
    console.log('   尝试手动调用 API...');
    
    const city = getRandomJapanCity();
    const requestBody = {
      country: PROXY_CONFIG.country,
      username: PROXY_CONFIG.username,
      city: city,
      count: '1',
      hostname: PROXY_CONFIG.hostname,
      format: '1',
    };

    console.log('   请求 URL:', PROXY_CONFIG.apiUrl);
    console.log('   请求 Headers:', {
      'Content-Type': 'application/json',
      token: PROXY_CONFIG.token.substring(0, 10) + '...',
      key: PROXY_CONFIG.key.substring(0, 10) + '...',
    });
    console.log('   请求 Body:', JSON.stringify(requestBody, null, 2));

    try {
      const response = await fetch(PROXY_CONFIG.apiUrl!, {
        method: 'POST',
        headers: {
          token: PROXY_CONFIG.token,
          key: PROXY_CONFIG.key,
        },
        body: JSON.stringify(requestBody),
      });

      console.log('\n   API 响应状态:', response.status, response.statusText);
      console.log('   响应 Headers:', Object.fromEntries(response.headers.entries()));

      const responseText = await response.text();
      console.log('   响应 Body:', responseText);

      try {
        const responseJson = JSON.parse(responseText);
        console.log('   响应 JSON:', JSON.stringify(responseJson, null, 2));
      } catch {
        console.log('   (响应不是有效的 JSON)');
      }
    } catch (fetchError) {
      console.error('   手动 API 调用失败:', fetchError);
    }
  }
}

testProxyAPI().catch(console.error);

