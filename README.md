# Playwright 移动设备反检测模拟项目

本项目旨在使用 Playwright 创建高度真实的移动设备浏览器环境，模拟 Android 和 iOS 设备，通过精确还原真机参数和特征来规避检测平台的识别。

## 功能特性

- ✅ 支持 iOS 和 Android 设备模拟
- ✅ 自动选择正确的浏览器内核（iOS=WebKit, Android=Chromium）
- ✅ 完整的设备指纹注入（Navigator、WebGL、Canvas、AudioContext）
- ✅ 基于真实设备数据的参数配置
- ✅ TypeScript 类型安全
- ✅ 模块化设计，易于扩展
- ✅ 使用 Prisma 数据库存储设备配置，支持自增 ID

## 安装

```bash
# 使用 pnpm 安装依赖
pnpm install

# 生成 Prisma Client
pnpm prisma:generate

# 运行数据库迁移
pnpm prisma:migrate

# 导入初始设备数据
pnpm prisma:seed

# 安装 Playwright 浏览器
pnpm exec playwright install
```

## 快速开始

```typescript
import { createMobileBrowser } from './src/index.js';

// 创建 iPhone 浏览器环境（使用数据库中的设备 ID）
const { browser, context, page } = await createMobileBrowser('1', {
  headless: false,
});

// 使用页面
await page.goto('https://example.com');

// 关闭浏览器
await browser.close();
```

## 数据库管理

### 查看设备列表

```typescript
import { getAllDevices } from './src/data/index.js';

const devices = await getAllDevices();
console.log(devices);
```

### 使用 Prisma Studio 管理数据

```bash
pnpm prisma:studio
```

这将打开一个 Web 界面，可以可视化地查看和管理设备数据。

### 添加新设备

```typescript
import { DatabaseAdapter } from './src/database/database-adapter.js';

const db = new DatabaseAdapter();

const deviceId = await db.insertDevice({
  name: 'iPhone 15 Pro',
  platform: 'ios',
  hardware: { /* ... */ },
  system: { /* ... */ },
  browser: { /* ... */ },
  fingerprint: { /* ... */ },
});

console.log('新设备 ID:', deviceId);
```

## API 文档

### `createMobileBrowser(deviceId, options?)`

创建移动浏览器环境。

**参数:**
- `deviceId` (string): 设备 ID（数据库自增 ID，转换为字符串）
- `options` (BrowserOptions, 可选):
  - `headless` (boolean): 是否无头模式，默认 `false`
  - `launchOptions`: Playwright 浏览器启动选项
  - `contextOptions`: Playwright 上下文选项
  - `timezoneId` (string): 时区 ID（可通过代理IP动态设置）
  - `language` (string): 语言代码（可通过代理IP动态设置）
  - `languages` (string[]): 语言列表（可通过代理IP动态设置）

**返回:** `Promise<MobileBrowserResult>`

**示例:**
```typescript
const { browser, context, page } = await createMobileBrowser('1');
```

### `getAllDevices()`

获取所有可用的设备配置。

**返回:** `Promise<DeviceProfile[]>`

### `getDeviceById(deviceId)`

根据设备 ID 获取设备配置。

**参数:**
- `deviceId` (string): 设备 ID（数据库自增 ID）

**返回:** `Promise<DeviceProfile | undefined>`

### `getDevicesByPlatform(platform)`

根据平台获取设备列表。

**参数:**
- `platform` ('ios' | 'android'): 平台类型

**返回:** `Promise<DeviceProfile[]>`

## 项目结构

```
fuck-sdun/
├── prisma/
│   └── schema.prisma          # Prisma 数据库模式
├── src/
│   ├── types/                 # 类型定义
│   ├── data/                  # 数据访问层（使用 Prisma）
│   ├── database/              # 数据库适配器和种子脚本
│   ├── managers/              # 管理器模块
│   ├── strategies/            # 指纹策略
│   ├── injectors/             # 指纹注入器
│   ├── adapters/              # 内核适配器
│   ├── configurators/         # 上下文配置器
│   └── index.ts               # 主入口
├── examples/                  # 示例代码
└── tests/                     # 测试文件
```

## 开发

```bash
# 编译 TypeScript
pnpm build

# 运行示例
pnpm dev

# 运行测试
pnpm test

# 打开 Prisma Studio
pnpm prisma:studio

# 创建新的数据库迁移
pnpm prisma:migrate dev --name migration_name
```

## 数据库操作

### 初始化数据库

```bash
# 1. 生成 Prisma Client
pnpm prisma:generate

# 2. 创建数据库和表结构
pnpm prisma:migrate dev

# 3. 导入初始数据
pnpm prisma:seed
```

### 添加新设备

可以通过以下方式添加新设备：

1. **使用 Prisma Studio**（推荐）:
   ```bash
   pnpm prisma:studio
   ```

2. **使用代码**:
   ```typescript
   import { DatabaseAdapter } from './src/database/database-adapter.js';
   
   const db = new DatabaseAdapter();
   const deviceId = await db.insertDevice(deviceProfile);
   ```

3. **修改 seed.ts** 然后运行:
   ```bash
   pnpm prisma:seed
   ```

## 注意事项

1. **设备参数真实性**: 所有参数必须基于真实设备数据
2. **平台差异**: 严格区分 iOS 和 Android 的平台特征和限制
3. **内核匹配**: 确保浏览器内核与设备平台匹配（iOS=WebKit, Android=Chromium）
4. **指纹一致性**: 确保所有指纹参数之间的一致性
5. **数据库 ID**: 设备 ID 现在是自增的数字，但在 API 中转换为字符串以保持兼容性

## 许可证

MIT
