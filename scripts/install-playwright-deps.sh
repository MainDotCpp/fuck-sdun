#!/bin/bash

# Playwright 系统依赖安装脚本（CentOS/RHEL）
# 此脚本需要 sudo 权限

# 不使用 set -e，因为某些依赖包可能已经安装或不可用，应该继续执行

# 获取脚本所在目录的绝对路径
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

# 切换到项目目录
cd "$PROJECT_DIR" || exit 1

echo "🔧 安装 Playwright 系统依赖（CentOS/RHEL）..."

# 检查是否有 sudo 权限
if [ "$EUID" -ne 0 ]; then
  echo "⚠️  此脚本需要 sudo 权限来安装系统依赖"
  echo "请使用: sudo bash scripts/install-playwright-deps.sh"
  exit 1
fi

# 检测系统类型
if [ -f /etc/redhat-release ]; then
  # CentOS/RHEL 系统
  echo "检测到 CentOS/RHEL 系统"
  
  # 首先尝试使用 Playwright 的自动安装脚本（推荐）
  echo "尝试使用 Playwright 自动安装系统依赖..."
  cd "$PROJECT_DIR"
  
  if command -v pnpm &> /dev/null; then
    echo "使用 pnpm 安装 Playwright 浏览器..."
    pnpm exec playwright install chromium || echo "⚠️  Playwright 浏览器安装失败，继续安装系统依赖..."
    echo "使用 pnpm 安装 Playwright 系统依赖..."
    pnpm exec playwright install-deps chromium || echo "⚠️  Playwright 自动安装失败，使用手动安装..."
  elif command -v npm &> /dev/null; then
    echo "使用 npm 安装 Playwright 浏览器..."
    npm exec playwright install chromium || echo "⚠️  Playwright 浏览器安装失败，继续安装系统依赖..."
    echo "使用 npm 安装 Playwright 系统依赖..."
    npm exec playwright install-deps chromium || echo "⚠️  Playwright 自动安装失败，使用手动安装..."
  else
    echo "❌ 未找到 pnpm 或 npm，请先安装 Node.js 和包管理器"
    exit 1
  fi
  
  # 手动安装缺失的依赖库
  echo ""
  echo "安装缺失的系统依赖库..."
  
  # 检查并安装 EPEL 仓库（如果未安装）
  if ! yum list installed epel-release &> /dev/null; then
    echo "安装 EPEL 仓库..."
    yum install -y epel-release || echo "⚠️  EPEL 仓库安装失败，某些包可能无法安装"
  fi
  
  # 安装基础依赖
  echo "安装基础依赖包..."
  yum install -y \
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
    pango.x86_64 || echo "⚠️  部分基础依赖安装失败"
  
  # 安装 ICU 库（libicu*）
  echo "安装 ICU 库..."
  yum install -y \
    libicu \
    libicu-devel || echo "⚠️  ICU 库安装失败，尝试安装兼容版本..."
  
  # 安装图像处理库（libjpeg, libwebp）
  echo "安装图像处理库..."
  yum install -y \
    libjpeg-turbo \
    libjpeg-turbo-devel \
    libwebp \
    libwebp-devel || echo "⚠️  图像处理库安装失败"
  
  # 安装拼写检查库（libenchant）
  echo "安装拼写检查库..."
  yum install -y \
    enchant \
    enchant-devel || echo "⚠️  拼写检查库安装失败"
  
  # 安装密钥存储库（libsecret）
  echo "安装密钥存储库..."
  yum install -y \
    libsecret \
    libsecret-devel || echo "⚠️  密钥存储库安装失败"
  
  # 安装断字库（libhyphen）
  echo "安装断字库..."
  yum install -y \
    hyphen \
    hyphen-devel || echo "⚠️  断字库安装失败"
  
  # 安装 FFI 库（libffi）
  echo "安装 FFI 库..."
  yum install -y \
    libffi \
    libffi-devel || echo "⚠️  FFI 库安装失败"
  
  # 安装事件设备库（libevdev）
  echo "安装事件设备库..."
  yum install -y \
    libevdev \
    libevdev-devel || echo "⚠️  事件设备库安装失败"
  
  # 安装 OpenGL ES 库（libGLESv2）
  echo "安装 OpenGL ES 库..."
  yum install -y \
    mesa-libGLES \
    mesa-libGLES-devel || echo "⚠️  OpenGL ES 库安装失败"
  
  # 安装 H.264 编解码库（libx264）
  echo "安装 H.264 编解码库..."
  # libx264 通常在 RPM Fusion 仓库中
  if ! yum list installed rpmfusion-free-release &> /dev/null; then
    echo "尝试安装 RPM Fusion 仓库（用于 libx264）..."
    # CentOS 7
    if [ -f /etc/centos-release ] && grep -q "release 7" /etc/centos-release; then
      yum install -y https://download1.rpmfusion.org/free/el/rpmfusion-free-release-7.noarch.rpm || echo "⚠️  RPM Fusion 仓库安装失败"
    # CentOS 8
    elif [ -f /etc/centos-release ] && grep -q "release 8" /etc/centos-release; then
      yum install -y https://download1.rpmfusion.org/free/el/rpmfusion-free-release-8.noarch.rpm || echo "⚠️  RPM Fusion 仓库安装失败"
    fi
  fi
  yum install -y \
    x264 \
    x264-devel || echo "⚠️  H.264 编解码库安装失败（可能需要 RPM Fusion 仓库）"
  
  # 安装 WOFF2 解码库（libwoff2dec）
  # 这个库可能不在标准仓库中，需要从源码编译或使用第三方仓库
  echo "⚠️  libwoff2dec 可能不在标准仓库中，如果 Playwright 仍然报错，可能需要从源码编译"
  
  # 更新动态链接库缓存
  echo "更新动态链接库缓存..."
  ldconfig || echo "⚠️  ldconfig 执行失败（可能需要手动运行）"
  
  echo ""
  echo "✅ 系统依赖安装完成！"
  echo ""
  echo "📝 重要提示："
  echo "1. 某些库（如 libwoff2dec）可能不在标准仓库中"
  echo "2. 如果 Playwright 仍然报错，请尝试："
  echo "   - 运行: pnpm exec playwright install-deps chromium"
  echo "   - 检查错误信息中缺失的库文件"
  echo "   - 使用 'yum provides */libxxx.so.*' 查找对应的包"
  echo "   - 检查库文件版本是否匹配（如 libicu.so.66 可能需要更新版本的 libicu）"
  echo ""
  echo "3. 如果缺少特定版本的库（如 libicu.so.66），可能需要："
  echo "   - 安装更新版本的 libicu 包"
  echo "   - 或者创建符号链接指向已安装的版本"
  echo "   - 或者使用 Playwright 自带的依赖安装工具"
  
else
  echo "⚠️  未检测到 CentOS/RHEL 系统"
  echo "请参考 Playwright 官方文档安装系统依赖"
  echo "https://playwright.dev/docs/browsers#installing-system-dependencies"
  exit 1
fi

echo "✅ Playwright 系统依赖安装完成！"

