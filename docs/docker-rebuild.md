# Docker 重新构建和重启指南

当 Dockerfile 或其他构建相关文件改变时，需要重新构建镜像并重启容器。

## 方式一：使用 Docker Compose（推荐）

### 完整重新构建流程

```bash
# 1. 停止并删除容器
docker-compose down

# 2. 重新构建镜像（不使用缓存，确保使用最新的 Dockerfile）
docker-compose build --no-cache

# 3. 启动容器
docker-compose up -d

# 4. 查看日志确认启动成功
docker-compose logs -f
```

### 快速重新构建（一行命令）

```bash
# 停止、重新构建并启动（使用缓存加速）
docker-compose up -d --build

# 或者强制重新构建（不使用缓存）
docker-compose up -d --build --force-recreate --no-deps
```

### 仅重新构建特定服务

```bash
# 只重新构建应用服务
docker-compose build app

# 然后重启
docker-compose up -d app
```

## 方式二：使用 Docker 命令

### 完整重新构建流程

```bash
# 1. 停止并删除旧容器
docker stop fuck-sdun
docker rm fuck-sdun

# 2. 删除旧镜像（可选，释放空间）
docker rmi fuck-sdun:latest

# 3. 重新构建镜像（不使用缓存）
docker build --no-cache -t fuck-sdun:latest .

# 4. 启动新容器
docker run -d \
  --name fuck-sdun \
  -p 9292:9292 \
  -v $(pwd)/prisma/devices.db:/app/prisma/devices.db \
  -v $(pwd)/logs:/app/logs \
  fuck-sdun:latest

# 5. 查看日志
docker logs -f fuck-sdun
```

### 快速重新构建（保留数据）

```bash
# 停止容器
docker stop fuck-sdun

# 重新构建镜像
docker build -t fuck-sdun:latest .

# 删除旧容器（数据卷会保留）
docker rm fuck-sdun

# 启动新容器（使用相同的数据卷挂载）
docker run -d \
  --name fuck-sdun \
  -p 9292:9292 \
  -v $(pwd)/prisma/devices.db:/app/prisma/devices.db \
  -v $(pwd)/logs:/app/logs \
  fuck-sdun:latest
```

## 使用项目脚本（已配置）

项目已经在 `package.json` 中配置了便捷命令：

```bash
# 重新构建镜像
pnpm docker:build

# 使用 Docker Compose 重新构建并启动
pnpm docker:compose:up

# 停止容器
pnpm docker:compose:down

# 查看日志
pnpm docker:compose:logs
```

## 常见场景

### 场景 1：只修改了 Dockerfile

```bash
# Docker Compose
docker-compose up -d --build

# Docker 命令
docker build -t fuck-sdun:latest . && docker restart fuck-sdun
```

### 场景 2：修改了代码和 Dockerfile

```bash
# Docker Compose（推荐）
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Docker 命令
docker stop fuck-sdun && docker rm fuck-sdun
docker build --no-cache -t fuck-sdun:latest .
docker run -d --name fuck-sdun -p 9292:9292 \
  -v $(pwd)/prisma/devices.db:/app/prisma/devices.db \
  -v $(pwd)/logs:/app/logs \
  fuck-sdun:latest
```

### 场景 3：只修改了代码（未修改 Dockerfile）

```bash
# 如果使用卷挂载了源代码，可以直接重启
docker-compose restart

# 或者
docker restart fuck-sdun
```

### 场景 4：清理所有并重新开始

```bash
# Docker Compose
docker-compose down -v  # -v 会删除卷
docker-compose build --no-cache
docker-compose up -d

# Docker 命令
docker stop fuck-sdun && docker rm fuck-sdun
docker rmi fuck-sdun:latest
docker build --no-cache -t fuck-sdun:latest .
docker run -d --name fuck-sdun -p 9292:9292 \
  -v $(pwd)/prisma/devices.db:/app/prisma/devices.db \
  -v $(pwd)/logs:/app/logs \
  fuck-sdun:latest
```

## 验证重新构建是否成功

```bash
# 查看容器状态
docker-compose ps
# 或
docker ps | grep fuck-sdun

# 查看日志
docker-compose logs -f app
# 或
docker logs -f fuck-sdun

# 检查应用是否正常响应
curl http://localhost:9292/OmxoUR
```

## 注意事项

1. **数据持久化**：重新构建不会影响挂载的数据卷（数据库文件、日志等）
2. **端口占用**：确保端口 9292 未被其他服务占用
3. **构建缓存**：使用 `--no-cache` 可以确保完全重新构建，但会较慢
4. **镜像大小**：重新构建后，旧镜像会变成 `<none>`，可以使用 `docker image prune` 清理

## 故障排查

### 问题：构建失败

```bash
# 查看详细构建日志
docker-compose build --progress=plain --no-cache

# 或
docker build --progress=plain --no-cache -t fuck-sdun:latest .
```

### 问题：容器启动失败

```bash
# 查看容器日志
docker logs fuck-sdun

# 进入容器调试
docker exec -it fuck-sdun /bin/bash
```

### 问题：端口被占用

```bash
# 查找占用端口的进程
lsof -i :9292
# 或
netstat -tulpn | grep 9292

# 停止占用端口的服务或修改端口映射
```

## 最佳实践

1. **开发环境**：使用 `docker-compose up --build` 快速迭代
2. **生产环境**：使用 `docker-compose build --no-cache` 确保完全重新构建
3. **CI/CD**：在构建脚本中使用 `--no-cache` 和 `--pull` 确保使用最新基础镜像
4. **版本管理**：为镜像打标签，如 `fuck-sdun:v1.0.0`

