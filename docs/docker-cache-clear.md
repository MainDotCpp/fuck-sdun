# Docker 缓存清理指南

## 问题说明

在 Docker 部署中，容器内的 `.next` 目录是独立的，删除容器外的 `.next` 不会影响容器内的构建缓存。

## 解决方案

### 方案一：重新构建 Docker 镜像（推荐）

```bash
# 停止并删除容器
docker-compose down

# 强制重新构建（不使用缓存）
docker-compose build --no-cache

# 启动容器
docker-compose up -d

# 查看日志确认
docker-compose logs -f
```

### 方案二：进入容器清理缓存

```bash
# 进入运行中的容器
docker exec -it fuck-sdun /bin/bash

# 在容器内删除 .next 目录
rm -rf .next

# 重新构建（如果使用开发模式）
# 或者重启容器让 Next.js 重新构建
exit

# 重启容器
docker-compose restart
```

### 方案三：使用便捷脚本

```bash
# 使用项目提供的脚本
pnpm docker:compose:rebuild:no-cache
```

## 验证更新

1. **检查容器内的文件**：
```bash
docker exec -it fuck-sdun ls -la app/devices/page.tsx
```

2. **查看构建日志**：
```bash
docker-compose logs app | grep -i "compiled\|error"
```

3. **强制刷新浏览器**：
   - 按 `Ctrl+Shift+R` (Windows) 或 `Cmd+Shift+R` (Mac)
   - 或在开发者工具中禁用缓存

## 注意事项

- Docker 镜像构建时会复制代码，所以需要重新构建镜像才能应用代码更改
- 如果使用卷挂载（volume），代码更改会立即生效，但 `.next` 缓存仍在容器内
- 生产环境建议使用 `--no-cache` 确保完全重新构建

