# CentOS 系统部署指南

本文档说明如何在 CentOS/RHEL 系统上部署和运行本项目。

## 前置要求

1. **Node.js 和包管理器**
   - Node.js 18+ 
   - pnpm（推荐）或 npm

2. **系统权限**
   - 安装 Playwright 系统依赖需要 sudo 权限

## 安装步骤

### 1. 安装 Node.js 和 pnpm（如果未安装）

```bash
# 安装 Node.js（使用 NodeSource 仓库）
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# 安装 pnpm
npm install -g pnpm
```

### 2. 安装 Playwright 系统依赖

Playwright 需要系统级别的依赖才能运行浏览器。有两种方式安装：

#### 方式一：使用自动安装脚本（推荐）

```bash
# 需要 sudo 权限
sudo bash scripts/install-playwright-deps.sh
```

这个脚本会：
- 自动检测 CentOS/RHEL 系统
- 安装 Playwright 浏览器（Chromium）
- 安装所需的系统依赖

#### 方式二：手动安装系统依赖

如果自动脚本失败，可以手动安装。根据 Playwright 的错误信息，可能需要安装以下依赖：

**基础依赖：**
```bash
sudo yum install -y \
  alsa-lib.x86_64 \
  atk.x86_64 \
  cups-libs.x86_64 \
  gtk3.x86_64 \
  libXcomposite.x86_64 \
  libXcursor.x86_64 \
  libXdamage.x86_64 \
  libXext.x86_64 \
  libXi.x86_64 \
  libXrandr.x86_64 \
  libXScrnSaver.x86_64 \
  libXtst.x86_64 \
  pango.x86_64
```

**ICU 库（libicu*）：**
```bash
sudo yum install -y libicu libicu-devel
```

**图像处理库（libjpeg, libwebp）：**
```bash
sudo yum install -y libjpeg-turbo libjpeg-turbo-devel libwebp libwebp-devel
```

**其他依赖库：**
```bash
# 安装 EPEL 仓库（如果未安装）
sudo yum install -y epel-release

# 安装其他依赖
sudo yum install -y \
  enchant enchant-devel \
  libsecret libsecret-devel \
  hyphen hyphen-devel \
  libffi libffi-devel \
  libevdev libevdev-devel \
  mesa-libGLES mesa-libGLES-devel
```

**H.264 编解码库（libx264）：**
```bash
# 需要 RPM Fusion 仓库
# CentOS 7:
sudo yum install -y https://download1.rpmfusion.org/free/el/rpmfusion-free-release-7.noarch.rpm
# CentOS 8:
sudo yum install -y https://download1.rpmfusion.org/free/el/rpmfusion-free-release-8.noarch.rpm

sudo yum install -y x264 x264-devel
```

**WOFF2 解码库（libwoff2dec）：**
这个库可能不在标准仓库中。如果 Playwright 仍然报错，可以尝试：
```bash
# 使用 Playwright 的自动安装
pnpm exec playwright install-deps chromium

# 或者查找对应的包
yum provides */libwoff2dec.so.*
```

然后安装 Playwright 浏览器：

```bash
pnpm exec playwright install chromium
```

### 3. 安装项目依赖和启动

使用启动脚本（会自动安装依赖、构建和启动）：

```bash
bash scripts/start.sh
```

或者手动执行：

```bash
# 安装依赖
pnpm install

# 安装 Playwright 浏览器
pnpm exec playwright install chromium

# 生成 Prisma Client
pnpm prisma generate

# 构建项目
pnpm next:build

# 启动（使用 PM2）
pm2 start ecosystem.config.cjs
```

## 常见问题

### 问题：`Host system is missing dependencies to run browsers`

**原因**：系统缺少 Playwright 运行浏览器所需的系统依赖。

**解决方案**：
1. 运行 `sudo bash scripts/install-playwright-deps.sh`
2. 或者手动安装系统依赖（见上面的方式二）

### 问题：`playwright: command not found`

**原因**：Playwright 浏览器未安装。

**解决方案**：
```bash
pnpm exec playwright install chromium
```

### 问题：权限不足

**原因**：安装系统依赖需要 sudo 权限。

**解决方案**：
- 使用 `sudo` 运行安装脚本
- 或者联系系统管理员安装依赖

## 验证安装

安装完成后，可以运行以下命令验证：

```bash
# 检查 Playwright 版本
pnpm exec playwright --version

# 检查浏览器是否已安装
ls -la node_modules/.playwright

# 测试浏览器启动（可选）
pnpm exec playwright test --help
```

## 生产环境部署

在生产环境中，建议：

1. **使用 PM2 管理进程**：
   ```bash
   pm2 start ecosystem.config.cjs
   pm2 save
   pm2 startup  # 设置开机自启
   ```

2. **配置防火墙**：
   ```bash
   # 开放 9292 端口（如果使用防火墙）
   sudo firewall-cmd --permanent --add-port=9292/tcp
   sudo firewall-cmd --reload
   ```

3. **配置日志轮转**：
   - PM2 会自动管理日志
   - 日志文件位于 `./logs/` 目录

## 参考链接

- [Playwright 官方文档 - 系统依赖](https://playwright.dev/docs/browsers#installing-system-dependencies)
- [Playwright GitHub Issues - CentOS](https://github.com/microsoft/playwright/issues)

