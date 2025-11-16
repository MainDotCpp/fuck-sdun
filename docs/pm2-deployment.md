# PM2 部署指南

## 概述

本项目支持使用 PM2 进行生产环境部署。PM2 是一个 Node.js 进程管理器，可以保持应用持续运行，并提供日志、监控、自动重启等功能。

## 安装 PM2

```bash
# 全局安装 PM2
npm install -g pm2

# 或使用 pnpm
pnpm add -g pm2
```

## 配置说明

### 1. 构建项目

在部署前，需要先构建 Next.js 应用：

```bash
pnpm next:build
```

### 2. PM2 配置文件

项目已包含 `ecosystem.config.cjs` 配置文件，包含以下配置：

- **应用名称**: `fuck-sdun`
- **启动脚本**: `next start`
- **实例数**: 1（单实例，因为 Playwright 需要单实例运行）
- **运行模式**: `fork`（单进程模式）
- **端口**: 9292（可通过环境变量修改）
- **日志**: 输出到 `./logs/` 目录
- **自动重启**: 启用
- **内存限制**: 1GB（超过后自动重启）

### 3. 环境变量

在 `ecosystem.config.cjs` 中配置环境变量，或使用 `.env` 文件：

```bash
# .env 文件
NODE_ENV=production
PORT=9292
LOG_LEVEL=info
```

## 部署步骤

### 方式一：使用启动脚本（推荐）

启动脚本会自动执行依赖安装、数据库迁移、构建和启动：

```bash
# 使用启动脚本（包含完整流程）
pnpm start:prod

# 或直接执行脚本
bash scripts/start.sh
```

启动脚本会依次执行：
1. ✅ 安装依赖 (`pnpm install`)
2. ✅ 生成 Prisma Client (`pnpm prisma generate`)
3. ✅ 运行数据库迁移 (`pnpm prisma migrate deploy`)
4. ✅ 构建 Next.js 应用 (`pnpm next:build`)
5. ✅ 启动应用（使用 PM2）

### 方式二：手动部署

如果需要手动控制每个步骤：

```bash
# 1. 安装依赖
pnpm install

# 2. 生成 Prisma Client
pnpm prisma generate

# 3. 运行数据库迁移（如果需要）
pnpm prisma migrate deploy

# 4. 构建应用
pnpm next:build

# 5. 启动应用（使用 PM2）
pm2 start ecosystem.config.cjs
```

### 方式三：使用 setup 脚本

快速设置（安装依赖、生成 Prisma、构建）：

```bash
pnpm setup
pm2 start ecosystem.config.cjs
```

### 3. 查看状态

```bash
# 查看应用状态
pm2 status

# 查看日志
pm2 logs fuck-sdun

# 查看详细信息
pm2 show fuck-sdun
```

### 4. 管理应用

```bash
# 停止应用
pm2 stop fuck-sdun

# 重启应用
pm2 restart fuck-sdun

# 删除应用
pm2 delete fuck-sdun

# 重新加载（零停机时间）
pm2 reload fuck-sdun
```

### 5. 开机自启

```bash
# 保存当前 PM2 进程列表
pm2 save

# 设置开机自启
pm2 startup

# 按照提示执行命令（通常是 sudo 权限）
```

## 注意事项

### 1. Playwright 浏览器

- **单实例运行**: 由于 Playwright 浏览器实例管理，必须使用单实例模式
- **浏览器路径**: 确保服务器上已安装 Playwright 浏览器：
  ```bash
  pnpm exec playwright install
  ```

### 2. 数据库

- **SQLite 数据库**: 确保 `prisma/devices.db` 文件存在且可写
- **数据库迁移**: 部署前运行：
  ```bash
  pnpm prisma migrate deploy
  pnpm prisma generate
  ```

### 3. 端口配置

- 默认端口：9292
- 可通过环境变量 `PORT` 修改
- 确保防火墙开放相应端口

### 4. 日志管理

- 日志文件位于 `./logs/` 目录
- 建议定期清理或使用日志轮转工具
- 可以使用 PM2 的日志轮转模块：
  ```bash
  pm2 install pm2-logrotate
  ```

### 5. 内存和性能

- 监控内存使用情况
- Playwright 浏览器实例会占用较多内存
- 建议服务器至少 2GB 内存

## 监控和管理

### PM2 监控面板

```bash
# 启动监控面板
pm2 monit
```

### 查看资源使用

```bash
# 查看 CPU 和内存使用
pm2 status

# 查看详细信息
pm2 show fuck-sdun
```

## 故障排查

### 1. 应用无法启动

- 检查端口是否被占用：`lsof -i :9292`
- 查看错误日志：`pm2 logs fuck-sdun --err`
- 检查环境变量配置

### 2. 浏览器启动失败

- 确认 Playwright 浏览器已安装
- 检查系统依赖（某些 Linux 发行版需要额外依赖）
- 查看应用日志中的错误信息

### 3. 数据库错误

- 确认数据库文件权限
- 检查数据库文件路径
- 运行数据库迁移

## 生产环境建议

1. **使用反向代理**: 建议使用 Nginx 或 Caddy 作为反向代理
2. **HTTPS**: 配置 SSL 证书
3. **日志轮转**: 配置日志轮转避免磁盘满
4. **监控告警**: 配置监控和告警系统
5. **备份**: 定期备份数据库文件

## Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:9292;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 相关命令

```bash
# 构建
pnpm next:build

# 启动（开发）
pnpm next:dev

# 启动（生产，使用 PM2）
pm2 start ecosystem.config.cjs

# 查看日志
pm2 logs fuck-sdun

# 重启
pm2 restart fuck-sdun

# 停止
pm2 stop fuck-sdun
```

