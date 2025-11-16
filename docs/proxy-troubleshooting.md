# 922proxy 代理获取失败排查指南

## 常见问题及解决方案

### 1. 认证信息错误

**症状**：API 返回 401 Unauthorized 或认证失败

**检查项**：
- ✅ 确认 `src/config/proxy-config.ts` 中的 `token` 和 `key` 是否正确
- ✅ 登录 [922proxy 仪表板](https://doc.922proxy.com/) >> 我的账户 >> 账户安全，确认 token 和 key
- ✅ 确认 `username` 是否正确（应该是您的账户用户名，不是邮箱）

**解决方案**：
更新 `src/config/proxy-config.ts` 中的配置：
```typescript
export const PROXY_CONFIG = {
  token: 'your_correct_token',
  key: 'your_correct_key',
  username: 'your_correct_username', // 注意：不是邮箱
  // ...
};
```

### 2. 账户余额不足

**症状**：API 返回成功但数据为空，或返回余额不足的错误

**检查项**：
- ✅ 登录 922proxy 仪表板，检查账户余额
- ✅ 确认 ISP 代理服务是否已开通
- ✅ 确认是否有足够的流量/IP 配额

**解决方案**：
- 充值账户余额
- 或联系 922proxy 客服

### 3. API 请求格式错误

**症状**：API 返回 400 Bad Request 或格式错误

**检查项**：
- ✅ 确认 API URL 是否正确：`https://docapi.922proxy.com/api/proxy/isp_generate`
- ✅ 确认请求方法为 `POST`
- ✅ 确认 Headers 中包含 `token` 和 `key`
- ✅ 确认 Body 参数格式正确

**当前请求格式**：
```typescript
{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    token: 'your_token',
    key: 'your_key',
  },
  body: JSON.stringify({
    username: 'your_username',
    country: 'Japan',
    city: 'Tokyo', // 随机选择
    count: '1',
    hostname: 'Singapore',
    format: '1',
  }),
}
```

### 4. 目标区域代理资源不足

**症状**：API 返回成功但 `data` 为空数组，或返回资源不足的错误

**检查项**：
- ✅ 确认请求的日本城市是否有可用代理
- ✅ 尝试不同的城市
- ✅ 确认 `hostname` 设置是否正确（`Singapore` 可能不是日本代理的主机名）

**可能的解决方案**：
- 修改 `hostname` 为日本相关的主机名（如果有）
- 或联系 922proxy 确认日本代理的主机名配置

### 5. 网络连接问题

**症状**：请求超时或网络错误

**检查项**：
- ✅ 确认服务器可以访问 `docapi.922proxy.com`
- ✅ 检查防火墙设置
- ✅ 检查 DNS 解析

**测试命令**：
```bash
curl -X POST https://docapi.922proxy.com/api/proxy/isp_generate \
  -H "Content-Type: application/json" \
  -H "token: your_token" \
  -H "key: your_key" \
  -d '{"username":"your_username","country":"Japan","city":"Tokyo","count":"1","hostname":"Singapore","format":"1"}'
```

### 6. 服务端问题

**症状**：API 返回 500 或服务不可用

**检查项**：
- ✅ 查看 922proxy 官方公告
- ✅ 联系 922proxy 客服
- ✅ 等待服务恢复

## 调试步骤

### 步骤 1：启用详细日志

设置环境变量 `LOG_LEVEL=debug` 以查看详细的请求和响应信息：

```bash
LOG_LEVEL=debug pnpm next:dev
```

### 步骤 2：检查日志输出

查看日志中的以下信息：
- 请求参数（国家、城市、主机名）
- API 响应状态码
- API 响应数据
- 错误消息

### 步骤 3：手动测试 API

使用 `tools/test-proxy-api.ts` 脚本进行测试：

```bash
pnpm tsx tools/test-proxy-api.ts
```

### 步骤 4：验证配置

确认以下配置项：
- ✅ Token: 从仪表板获取的正确 token
- ✅ Key: 从仪表板获取的正确 key
- ✅ Username: 账户用户名（不是邮箱）
- ✅ Country: `Japan`（固定）
- ✅ City: 从 `JAPAN_CITIES` 列表中随机选择
- ✅ Hostname: `Singapore`（可能需要根据实际服务调整）

## 常见错误消息

### "922proxy API 请求失败: 401 Unauthorized"
- **原因**：认证信息错误
- **解决**：检查 token、key 和 username

### "922proxy API 返回错误: 余额不足"
- **原因**：账户余额不足
- **解决**：充值账户

### "922proxy API 返回空数据"
- **原因**：目标区域没有可用代理，或余额不足
- **解决**：检查账户余额，或尝试其他城市

### "网络请求失败，请检查网络连接或 API URL"
- **原因**：网络连接问题或 API URL 错误
- **解决**：检查网络连接和 API URL

## 联系支持

如果以上方法都无法解决问题，请：
1. 查看 922proxy 官方文档
2. 联系 922proxy 客服
3. 提供详细的错误日志和配置信息（注意隐藏敏感信息）

