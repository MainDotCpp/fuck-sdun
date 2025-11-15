/**
 * 检测 userAgentData 是否被 JavaScript 注入修改
 * 在浏览器控制台中运行此代码来检测
 */

(function() {
  console.log('=== 开始检测 userAgentData 注入 ===\n');
  
  // 1. 检查 userAgentData 是否存在
  if (!navigator.userAgentData) {
    console.log('❌ navigator.userAgentData 不存在');
    return;
  }
  
  console.log('✅ navigator.userAgentData 存在');
  
  // 2. 检查属性描述符
  const descriptor = Object.getOwnPropertyDescriptor(navigator, 'userAgentData');
  console.log('\n📋 属性描述符检查:');
  console.log('  - configurable:', descriptor?.configurable);
  console.log('  - enumerable:', descriptor?.enumerable);
  console.log('  - writable:', descriptor?.writable);
  console.log('  - 是否有 getter:', typeof descriptor?.get === 'function');
  console.log('  - 是否有 setter:', typeof descriptor?.set === 'function');
  
  // 如果 configurable 为 true，可能是被修改过的
  if (descriptor?.configurable === true) {
    console.log('  ⚠️  警告: configurable 为 true，可能被 Object.defineProperty 修改过');
  }
  
  // 3. 检查原型链
  console.log('\n🔗 原型链检查:');
  console.log('  - userAgentData 的原型:', Object.getPrototypeOf(navigator.userAgentData));
  console.log('  - 是否有 toString:', typeof navigator.userAgentData.toString === 'function');
  console.log('  - 是否有 valueOf:', typeof navigator.userAgentData.valueOf === 'function');
  
  // 4. 检查 brands 数组
  console.log('\n📦 brands 检查:');
  const brands = navigator.userAgentData.brands;
  console.log('  - brands:', JSON.stringify(brands, null, 2));
  console.log('  - brands 是否为数组:', Array.isArray(brands));
  console.log('  - brands 长度:', brands?.length);
  
  // 检查 brands 中的每个元素
  if (brands && Array.isArray(brands)) {
    brands.forEach((brand, index) => {
      console.log(`  - brand[${index}]:`, JSON.stringify(brand));
      console.log(`    - 是否为普通对象:`, Object.getPrototypeOf(brand) === Object.prototype);
      console.log(`    - 属性描述符:`, Object.getOwnPropertyDescriptors(brand));
    });
  }
  
  // 5. 检查 getHighEntropyValues 方法
  console.log('\n🔍 getHighEntropyValues 方法检查:');
  const getHighEntropyValues = navigator.userAgentData.getHighEntropyValues;
  console.log('  - 是否存在:', typeof getHighEntropyValues === 'function');
  
  if (typeof getHighEntropyValues === 'function') {
    // 检查方法是否被修改
    const methodDescriptor = Object.getOwnPropertyDescriptor(navigator.userAgentData, 'getHighEntropyValues');
    console.log('  - 方法描述符:', methodDescriptor);
    
    // 尝试调用方法
    getHighEntropyValues(['platform', 'platformVersion', 'model', 'mobile', 'architecture', 'bitness', 'fullVersion', 'uaFullVersion', 'wow64'])
      .then((values) => {
        console.log('  - 返回的高熵值:', JSON.stringify(values, null, 2));
        
        // 检查返回值的类型
        console.log('  - 返回值是否为 Promise.resolve 的结果:', values !== null && typeof values === 'object');
        
        // 检查是否有异常属性
        const hasUnexpectedProps = Object.keys(values).some(key => 
          !['platform', 'platformVersion', 'model', 'mobile', 'architecture', 'bitness', 'fullVersion', 'uaFullVersion', 'wow64'].includes(key)
        );
        if (hasUnexpectedProps) {
          console.log('  ⚠️  警告: 返回值包含意外的属性');
        }
      })
      .catch((error) => {
        console.log('  ❌ 调用失败:', error);
      });
  }
  
  // 6. 检查是否可以重新定义（检测是否被锁定）
  console.log('\n🔒 重新定义检查:');
  try {
    const originalValue = navigator.userAgentData;
    Object.defineProperty(navigator, 'userAgentData', {
      value: originalValue,
      configurable: false,
      enumerable: true,
      writable: false
    });
    console.log('  ✅ 可以重新定义（说明之前 configurable 为 true）');
  } catch (error) {
    console.log('  ❌ 无法重新定义:', error.message);
  }
  
  // 7. 检查是否通过 Proxy 修改
  console.log('\n🎭 Proxy 检查:');
  try {
    // 尝试检查 userAgentData 是否是一个 Proxy
    const proxyCheck = navigator.userAgentData;
    // 如果是一个 Proxy，某些操作可能会失败
    const stringified = JSON.stringify(proxyCheck);
    console.log('  - 可以 JSON.stringify:', stringified !== undefined);
  } catch (error) {
    console.log('  ⚠️  JSON.stringify 失败，可能是 Proxy:', error.message);
  }
  
  // 8. 检查函数实现（通过 toString）
  console.log('\n📝 函数实现检查:');
  if (typeof getHighEntropyValues === 'function') {
    const funcString = getHighEntropyValues.toString();
    console.log('  - getHighEntropyValues 源码:', funcString);
    
    // 检查是否是原生函数
    if (funcString.includes('[native code]')) {
      console.log('  ✅ 是原生函数');
    } else {
      console.log('  ⚠️  警告: 不是原生函数，可能是被注入的');
      console.log('  - 函数体:', funcString);
    }
    
    // 检查是否包含 Promise.resolve（可能是注入的特征）
    if (funcString.includes('Promise.resolve')) {
      console.log('  ⚠️  警告: 函数包含 Promise.resolve，可能是注入的特征');
    }
  }
  
  // 9. 综合判断
  console.log('\n🎯 综合判断:');
  const warnings = [];
  
  if (descriptor?.configurable === true) {
    warnings.push('configurable 为 true（可能被 Object.defineProperty 修改）');
  }
  
  if (typeof getHighEntropyValues === 'function') {
    const funcString = getHighEntropyValues.toString();
    if (!funcString.includes('[native code]')) {
      warnings.push('getHighEntropyValues 不是原生函数');
    }
    if (funcString.includes('Promise.resolve')) {
      warnings.push('getHighEntropyValues 包含 Promise.resolve（注入特征）');
    }
  }
  
  if (warnings.length === 0) {
    console.log('  ✅ 未发现明显的注入痕迹');
  } else {
    console.log('  ⚠️  发现以下可疑特征:');
    warnings.forEach((warning, index) => {
      console.log(`    ${index + 1}. ${warning}`);
    });
    console.log('\n  💡 这些特征可能表明 userAgentData 被 JavaScript 注入修改过');
  }
  
  console.log('\n=== 检测完成 ===');
})();

