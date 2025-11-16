# 使用 Playwright 官方推荐的 Ubuntu 基础镜像
# 这个镜像已经包含了 Playwright 运行所需的所有系统依赖
FROM mcr.microsoft.com/playwright:v1.40.0-focal

# 设置工作目录
WORKDIR /app

# 安装 pnpm（如果基础镜像没有）
RUN npm install -g pnpm

# 复制 package.json 和 pnpm-lock.yaml（如果存在）
COPY package.json pnpm-lock.yaml* ./

# 安装依赖（使用 pnpm）
RUN pnpm install --frozen-lockfile || pnpm install

# 安装 Playwright 浏览器（Chromium）
RUN pnpm exec playwright install chromium

# 复制 Prisma schema
COPY prisma ./prisma

# 生成 Prisma Client
RUN pnpm prisma generate

# 复制项目文件
COPY . .

# 构建 Next.js 应用
RUN pnpm next:build

# 暴露端口
EXPOSE 9292

# 设置环境变量
ENV NODE_ENV=production
ENV PORT=9292
ENV LOG_LEVEL=info

# 启动应用（使用 Next.js 生产模式）
CMD ["pnpm", "next:start"]

