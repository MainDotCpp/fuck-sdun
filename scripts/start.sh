#!/bin/bash

# 启动脚本
# 包含依赖安装、数据库迁移、构建和启动流程

set -e  # 遇到错误立即退出

# 获取脚本所在目录的绝对路径
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

# 切换到项目目录
cd "$PROJECT_DIR" || exit 1

echo "🚀 开始启动流程..."
echo "📁 项目目录: $PROJECT_DIR"

# 1. 安装依赖
echo "📦 安装依赖..."
pnpm install

# 2. 生成 Prisma Client
echo "🔧 生成 Prisma Client..."
pnpm prisma generate

# 3. 运行数据库迁移（如果需要）
echo "🗄️  检查数据库迁移..."
if [ -f "prisma/migrations" ] && [ "$(ls -A prisma/migrations 2>/dev/null)" ]; then
  echo "运行数据库迁移..."
  pnpm prisma migrate deploy || echo "迁移失败或无需迁移"
else
  echo "未找到迁移文件，跳过迁移步骤"
fi

# 4. 构建 Next.js 应用
echo "🏗️  构建 Next.js 应用..."
pnpm next:build

# 5. 启动应用（使用 PM2）
echo "✅ 启动应用..."
if command -v pm2 &> /dev/null; then
  pm2 start ecosystem.config.js
  echo "应用已启动，使用 'pm2 status' 查看状态"
else
  echo "⚠️  PM2 未安装，使用 'pnpm next:start' 启动"
  pnpm next:start
fi

echo "✨ 启动流程完成！"

