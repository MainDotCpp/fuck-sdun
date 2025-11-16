# Docker 部署指南

本文档说明如何使用 Docker 部署本项目。Docker 部署可以避免系统依赖问题，因为使用了 Playwright 官方支持的 Ubuntu 基础镜像。

## 前置要求

1. **Docker** 20.10+
2. **Docker Compose** 1.29+（可选，用于简化部署）

## 快速开始

### 方式一：使用 Docker Compose（推荐）

```bash
# 构建并启动
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止
docker-compose down
```

### 方式二：使用 Docker 命令

```bash
# 构建镜像
docker build -t fuck-sdun:latest .

# 运行容器
docker run -d \
  --name fuck-sdun \
  -p 9292:9292 \
  -v $(pwd)/prisma/devices.db:/app/prisma/devices.db \
  -v $(pwd)/logs:/app/logs \
  fuck-sdun:latest

# 查看日志
docker logs -f fuck-sdun

# 停止容器
docker stop fuck-sdun
docker rm fuck-sdun
```

## 详细说明

### Dockerfile 说明

项目使用 `Dockerfile`，基于 Playwright 官方镜像 `mcr.microsoft.com/playwright:v1.40.0-focal`：

- **基础镜像**：Ubuntu 20.04 (Focal)，已包含 Playwright 所需的所有系统依赖
- **包管理器**：pnpm
- **浏览器**：Chromium（自动安装）
- **数据库**：SQLite（Prisma），数据文件需要持久化

### 数据持久化

数据库文件需要持久化，否则容器重启后数据会丢失：

```bash
# 使用 Docker Compose（已配置）
volumes:
  - ./prisma/devices.db:/app/prisma/devices.db

# 或使用 Docker 命令
-v $(pwd)/prisma/devices.db:/app/prisma/devices.db
```

### 环境变量

可以通过环境变量配置应用：

```bash
# Docker Compose
environment:
  - NODE_ENV=production
  - PORT=9292
  - LOG_LEVEL=info

# Docker 命令
-e NODE_ENV=production \
-e PORT=9292 \
-e LOG_LEVEL=info
```

### 端口映射

默认端口是 `9292`，可以通过 `-p` 参数修改：

```bash
# 映射到主机的 8080 端口
-p 8080:9292
```

## 开发环境

如果需要使用 PM2 或其他开发工具，可以使用 `Dockerfile.dev`：

```bash
docker build -f Dockerfile.dev -t fuck-sdun:dev .
```

## 生产环境部署

### 1. 构建镜像

```bash
docker build -t fuck-sdun:latest .
```

### 2. 运行容器

```bash
docker run -d \
  --name fuck-sdun \
  --restart unless-stopped \
  -p 9292:9292 \
  -v /path/to/data/prisma/devices.db:/app/prisma/devices.db \
  -v /path/to/logs:/app/logs \
  fuck-sdun:latest
```

### 3. 使用 Docker Compose

```bash
# 启动
docker-compose up -d

# 查看状态
docker-compose ps

# 查看日志
docker-compose logs -f app

# 重启
docker-compose restart

# 停止
docker-compose down
```

## 常见问题

### 问题：容器启动失败

**检查日志**：
```bash
docker logs fuck-sdun
# 或
docker-compose logs app
```

**常见原因**：
1. 端口被占用：修改 `-p` 参数或停止占用端口的服务
2. 数据库文件权限问题：确保数据库文件目录有写权限
3. 依赖安装失败：检查网络连接和镜像源

### 问题：数据库文件丢失

**原因**：没有挂载数据卷

**解决方案**：确保使用 `-v` 参数挂载数据库文件：
```bash
-v $(pwd)/prisma/devices.db:/app/prisma/devices.db
```

### 问题：Playwright 浏览器无法启动

**原因**：Docker 容器缺少必要的权限或设备

**解决方案**：
```bash
# 添加必要的权限
docker run --cap-add=SYS_ADMIN \
  --security-opt seccomp=unconfined \
  ...
```

或者使用 Playwright 官方镜像（已包含所有依赖）。

### 问题：构建时间过长

**优化建议**：
1. 使用多阶段构建（如果需要）
2. 利用 Docker 层缓存
3. 使用 `.dockerignore` 排除不必要的文件

## 更新应用

### 方式一：重新构建并启动

```bash
# 停止旧容器
docker-compose down

# 重新构建
docker-compose build

# 启动新容器
docker-compose up -d
```

### 方式二：滚动更新（零停机）

```bash
# 构建新镜像
docker build -t fuck-sdun:v2 .

# 启动新容器（使用不同端口）
docker run -d --name fuck-sdun-v2 -p 9293:9292 fuck-sdun:v2

# 验证新版本正常后，停止旧容器
docker stop fuck-sdun
docker rm fuck-sdun

# 将新容器端口改回 9292
docker stop fuck-sdun-v2
docker rm fuck-sdun-v2
docker run -d --name fuck-sdun -p 9292:9292 fuck-sdun:v2
```

## 监控和日志

### 查看实时日志

```bash
# Docker Compose
docker-compose logs -f app

# Docker 命令
docker logs -f fuck-sdun
```

### 查看容器资源使用

```bash
docker stats fuck-sdun
```

### 进入容器调试

```bash
docker exec -it fuck-sdun /bin/bash
```

## 参考链接

- [Playwright Docker 文档](https://playwright.dev/docs/docker)
- [Docker 官方文档](https://docs.docker.com/)
- [Docker Compose 文档](https://docs.docker.com/compose/)

