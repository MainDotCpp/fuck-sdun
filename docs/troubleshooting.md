# 故障排查指南

## 页面更新后没有生效

如果修改了代码但页面没有更新，可以尝试以下方法：

### 1. 清理 Next.js 缓存

```bash
# 删除 .next 目录
rm -rf .next

# 重新构建
pnpm next:build
```

### 2. 清理浏览器缓存

- **Chrome/Edge**: 按 `Ctrl+Shift+R` (Windows) 或 `Cmd+Shift+R` (Mac) 强制刷新
- **Firefox**: 按 `Ctrl+F5` (Windows) 或 `Cmd+Shift+R` (Mac)
- 或者在开发者工具中右键刷新按钮，选择"清空缓存并硬性重新加载"

### 3. 重启开发服务器

```bash
# 停止当前服务器 (Ctrl+C)
# 然后重新启动
pnpm next:dev
```

### 4. 检查文件是否正确保存

确保文件已保存，检查文件修改时间：
```bash
ls -la app/devices/page.tsx
```

### 5. Docker 环境

如果使用 Docker，需要重新构建镜像：

```bash
# 重新构建并启动
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# 查看日志确认
docker-compose logs -f
```

### 6. 检查控制台错误

打开浏览器开发者工具（F12），查看 Console 和 Network 标签页是否有错误。

## 常见问题

### 问题：组件样式没有更新

**解决方案**：
1. 检查 Tailwind CSS 配置是否正确
2. 确保类名拼写正确
3. 清理 `.next` 目录并重新构建

### 问题：API 路由返回 404

**解决方案**：
1. 检查路由文件路径是否正确：`app/api/xxx/route.ts`
2. 确保使用正确的 HTTP 方法（GET、POST 等）
3. 重启开发服务器

### 问题：TypeScript 类型错误

**解决方案**：
1. 运行 `pnpm prisma generate` 重新生成 Prisma 客户端
2. 检查 `tsconfig.json` 配置
3. 重启 TypeScript 服务器（VS Code: Cmd+Shift+P -> "TypeScript: Restart TS Server"）

