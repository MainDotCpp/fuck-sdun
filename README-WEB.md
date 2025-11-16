# Web 应用使用指南

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 启动开发服务器

```bash
pnpm next:dev
```

访问 http://localhost:9292

### 3. 构建生产版本

```bash
pnpm next:build
pnpm next:start
```

## 功能说明

### 核心功能

1. **设备随机选择**: 从数据库随机选择一个设备配置
2. **语言随机选择**: 从语言列表（`ja-JP`, `ja`）中随机选择
3. **代理支持**: 支持配置代理（格式：`host:port:username:password`）
4. **Referer 设置**: 可以自定义 Referer 头
5. **锁机制**: 保证同时只有一个浏览器实例运行

### API 端点

#### POST `/api/browser/start`
启动浏览器

**请求体**:
```json
{
  "url": "https://example.com",
  "referer": "https://referer.example.com",
  "proxy": "host:port:username:password", // 可选
  "languageRotation": ["ja-JP", "ja"] // 可选
}
```

**响应**:
```json
{
  "success": true,
  "message": "浏览器启动请求已提交，正在后台处理"
}
```

#### GET `/api/browser/status`
获取浏览器状态

**响应**:
```json
{
  "isRunning": true,
  "deviceName": "iPhone 13",
  "startedAt": "2024-01-01T00:00:00.000Z"
}
```

#### POST `/api/browser/stop`
停止浏览器

**响应**:
```json
{
  "success": true,
  "message": "浏览器已关闭"
}
```

## 前端组件库推荐

详见 [docs/ui-component-libraries.md](./docs/ui-component-libraries.md)

### 推荐：shadcn/ui

**快速安装**:
```bash
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button input card alert badge
```

## 项目结构

```
fuck-sdun/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   └── browser/       # 浏览器管理 API
│   ├── components/        # React 组件
│   ├── page.tsx          # 主页
│   └── layout.tsx        # 布局
├── src/                   # 业务逻辑（保持不变）
│   ├── lib/              # 工具库
│   │   └── browser-manager.ts  # 浏览器管理器
│   └── ...               # 其他业务逻辑
└── docs/                 # 文档
```

## 注意事项

1. **浏览器资源**: Playwright 浏览器会占用较多资源，建议限制并发
2. **锁机制**: 使用锁机制保证同时只有一个浏览器运行
3. **异步处理**: 浏览器启动是异步的，API 会立即返回
4. **状态轮询**: 前端每 2 秒轮询一次浏览器状态

