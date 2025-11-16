# 922proxy 代理配置指南

## 概述

项目已集成 922proxy ISP 代理服务，每次浏览器启动前会自动从 922proxy API 获取一条代理。

**配置方式**：配置硬编码在程序中，国家固定为日本，城市随机选择。

## API 文档

参考：[922proxy ISP 代理 API 文档](https://doc.922proxy.com/api/dai-li-lian-jie-sheng-cheng/isp-dai-li)

## 配置步骤

### 1. 获取 API 凭证

1. 登录 [922proxy 仪表板](https://doc.922proxy.com/)
2. 进入 **我的账户** >> **账户安全**
3. 查看并复制以下信息：
   - **Token**
   - **Key**
   - **用户名**

### 2. 配置代理参数

编辑 `src/config/proxy-config.ts` 文件，修改以下配置：

```typescript
export const PROXY_CONFIG = {
  /** API Token */
  token: 'your_token_here',  // ← 替换为您的 token
  /** API Key */
  key: 'your_key_here',       // ← 替换为您的 key
  /** 用户名 */
  username: 'your_username_here', // ← 替换为您的用户名
  /** 主机名：端口 */
  hostname: 'Singapore',      // ← 根据需要修改
  /** API 地址 */
  apiUrl: 'https://docapi.922proxy.com/api/proxy/isp_generate',
  /** 国家（固定为日本） */
  country: 'Japan',
} as const;
```

### 3. 配置说明

| 配置项 | 说明 | 默认值 |
|-------|------|--------|
| `token` | API Token（必须） | `your_token_here` |
| `key` | API Key（必须） | `your_key_here` |
| `username` | 用户名（必须） | `your_username_here` |
| `hostname` | 主机名：端口 | `Singapore` |
| `country` | 国家（固定为日本） | `Japan` |
| `city` | 城市（自动随机选择） | 从 `JAPAN_CITIES` 列表中随机选择 |

### 4. 日本城市列表

系统会从以下日本主要城市中随机选择：

- Tokyo（东京）
- Osaka（大阪）
- Yokohama（横滨）
- Nagoya（名古屋）
- Sapporo（札幌）
- Fukuoka（福冈）
- Kobe（神户）
- Kyoto（京都）
- 以及其他主要城市...

每次浏览器启动时，系统会自动随机选择一个城市。

### 4. 支持的格式

代理格式支持：
- `hostname:port:username:password`（922proxy API 返回格式）

## 工作流程

1. **浏览器启动前**：
   - 系统从 `JAPAN_CITIES` 列表中随机选择一个城市
   - 调用 922proxy API 获取一条日本代理（使用随机选择的城市）
2. **代理获取成功**：将代理配置传递给浏览器
3. **代理获取失败**：记录警告日志，继续执行（不使用代理）

## 日志示例

### 成功获取代理

```
[2024-01-15T10:30:45.123Z] INFO  [ProxyService      ] 正在从 922proxy 获取代理 (国家: Japan, 城市: Tokyo)...
[2024-01-15T10:30:45.456Z] INFO  [ProxyService      ] 成功获取代理: http://1.1.1.1:22
[2024-01-15T10:30:45.789Z] INFO  [BrowserManager    ] 已获取代理: http://1.1.1.1:22
```

### 配置不完整

```
[2024-01-15T10:30:45.123Z] WARN  [ProxyService      ] 922proxy 配置未设置，请在 src/config/proxy-config.ts 中配置 token、key 和 username
[2024-01-15T10:30:45.456Z] WARN  [BrowserManager    ] 未配置 922proxy，将不使用代理
```

### 获取失败

```
[2024-01-15T10:30:45.123Z] INFO  [ProxyService      ] 正在从 922proxy 获取代理 (国家: Japan, 城市: Tokyo)...
[2024-01-15T10:30:45.456Z] ERROR [ProxyService      ] 获取代理失败
Error: 922proxy API 请求失败: 401 Unauthorized
[2024-01-15T10:30:45.789Z] ERROR [BrowserManager    ] 获取代理失败，将不使用代理
```

## 代码示例

### 使用默认配置（推荐）

```typescript
import { ProxyService } from '@/src/services/proxy-service';

// 使用默认配置（日本+随机城市）
const proxyService = ProxyService.createDefault();
if (proxyService) {
  const proxyConfig = await proxyService.getProxy();
  console.log('代理:', proxyConfig.proxyString);
  // 输出: 1.1.1.1:22:username-zone-custom-sessid-xxx:password
  console.log('城市:', proxyConfig.parsed.server);
}
```

### 手动创建 ProxyService

```typescript
import { ProxyService } from '@/src/services/proxy-service';
import { getRandomJapanCity } from '@/src/config/proxy-config';

const proxyService = new ProxyService({
  token: 'your_token',
  key: 'your_key',
  username: 'your_username',
  country: 'Japan',
  city: getRandomJapanCity(), // 随机选择城市
  hostname: 'Singapore',
});

const proxyConfig = await proxyService.getProxy();
console.log('代理:', proxyConfig.proxyString);
```

## 错误处理

系统设计为**容错模式**：
- 如果代理获取失败，会记录错误日志
- 浏览器会继续启动，但不使用代理
- 不会因为代理问题导致整个流程失败

## 注意事项

1. **API 限制**：请遵守 922proxy API 的使用限制和配额
2. **安全性**：不要将 `.env` 文件提交到 Git 仓库
3. **成本**：每次浏览器启动都会调用 API，请注意 API 调用成本
4. **网络**：确保服务器可以访问 `docapi.922proxy.com`

## 故障排查

### 问题：代理获取失败

1. **检查配置文件**：确保 `src/config/proxy-config.ts` 中的 `token`、`key` 和 `username` 已正确配置
2. **检查 API 凭证**：确认 Token 和 Key 是否正确
3. **检查网络**：确保服务器可以访问 922proxy API
4. **查看日志**：检查详细的错误信息

### 问题：代理格式错误

如果遇到代理格式错误，请检查：
- API 返回的数据格式是否符合预期
- `format` 参数是否正确设置为 `"1"`

### 问题：城市选择

如果需要修改城市列表，编辑 `src/config/proxy-config.ts` 中的 `JAPAN_CITIES` 数组。

## 相关文件

- `src/config/proxy-config.ts` - 代理配置文件（硬编码配置）
- `src/services/proxy-service.ts` - 代理服务实现
- `src/lib/browser-manager.ts` - 浏览器管理器（集成代理获取）

