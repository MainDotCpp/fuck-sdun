// 快速检测 userAgentData 是否被注入
// 复制以下代码到浏览器控制台运行

(() => {
  const checks = [];
  
  // 1. 检查属性描述符
  const desc = Object.getOwnPropertyDescriptor(navigator, 'userAgentData');
  if (desc?.configurable) checks.push('⚠️ configurable=true (可能被Object.defineProperty修改)');
  
  // 2. 检查 getHighEntropyValues 是否为原生函数
  const getHighEntropy = navigator.userAgentData?.getHighEntropyValues;
  if (getHighEntropy) {
    const code = getHighEntropy.toString();
    if (!code.includes('[native code]')) checks.push('⚠️ getHighEntropyValues不是原生函数');
    if (code.includes('Promise.resolve')) checks.push('⚠️ getHighEntropyValues包含Promise.resolve(注入特征)');
  }
  
  // 3. 显示结果
  console.log('=== userAgentData 注入检测 ===');
  console.log('Brands:', navigator.userAgentData?.brands);
  console.log('Platform:', navigator.userAgentData?.platform);
  console.log('Mobile:', navigator.userAgentData?.mobile);
  console.log('\n检测结果:');
  if (checks.length === 0) {
    console.log('✅ 未发现注入痕迹');
  } else {
    checks.forEach(c => console.log(c));
    console.log('\n💡 可能被JavaScript注入修改');
  }
  
  // 4. 详细检查（可选）
  console.log('\n详细描述符:', desc);
  if (getHighEntropy) {
    console.log('getHighEntropyValues源码:', getHighEntropy.toString());
  }
})();

