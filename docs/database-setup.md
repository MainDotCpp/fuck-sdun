# 数据库设置指南

## 使用 Prisma 管理设备配置数据库

本项目使用 Prisma ORM 和 SQLite 数据库来存储设备配置，支持自增 ID。

## 初始化步骤

### 1. 安装依赖

```bash
pnpm install
```

### 2. 生成 Prisma Client

```bash
pnpm prisma:generate
```

这会根据 `prisma/schema.prisma` 生成 TypeScript 类型和 Prisma Client。

### 3. 创建数据库和表结构

```bash
pnpm prisma:migrate dev
```

这会：
- 创建 `prisma/devices.db` 数据库文件
- 创建所有必要的表结构
- 创建迁移文件

### 4. 导入初始设备数据

```bash
pnpm prisma:seed
```

这会从 JSON 配置文件导入所有设备到数据库。

## 数据库结构

数据库包含以下表：

- **devices**: 设备主表（id 自增）
- **hardware_specs**: 硬件参数表
- **system_specs**: 系统参数表
- **browser_specs**: 浏览器参数表
- **fingerprint_specs**: 指纹参数表

所有表通过外键关联到 `devices` 表，使用级联删除。

## 使用 Prisma Studio 管理数据

```bash
pnpm prisma:studio
```

这会打开一个 Web 界面（通常是 http://localhost:5555），可以：
- 查看所有设备
- 添加新设备
- 编辑现有设备
- 删除设备

## 通过代码操作数据库

### 添加新设备

```typescript
import { DatabaseAdapter } from './src/database/database-adapter.js';

const db = new DatabaseAdapter();

const deviceId = await db.insertDevice({
  name: 'iPhone 15 Pro',
  platform: 'ios',
  hardware: {
    cpuCores: 6,
    screenWidth: 393,
    screenHeight: 852,
    devicePixelRatio: 3,
    colorDepth: 24,
  },
  system: {
    osVersion: '17.0',
    platform: 'iPhone',
  },
  browser: {
    userAgent: '...',
    version: '17.0',
    name: 'Safari',
    vendor: 'Apple Computer, Inc.',
  },
  fingerprint: {
    hardwareConcurrency: 6,
    maxTouchPoints: 5,
    webglRenderer: 'Apple GPU',
    webglVendor: 'Apple Inc.',
    // ... 其他指纹参数
  },
});

console.log('新设备 ID:', deviceId);
```

### 查询设备

```typescript
import { getAllDevices, getDeviceById } from './src/data/index.js';

// 获取所有设备
const devices = await getAllDevices();

// 根据 ID 获取设备（ID 是数字，转换为字符串）
const device = await getDeviceById('1');
```

### 更新设备

```typescript
import { DatabaseAdapter } from './src/database/database-adapter.js';

const db = new DatabaseAdapter();

await db.updateDevice(1, {
  // 更新设备配置
  name: 'iPhone',
  platform: 'ios',
  // ... 其他配置
});
```

### 删除设备

```typescript
import { DatabaseAdapter } from './src/database/database-adapter.js';

const db = new DatabaseAdapter();

await db.deleteDevice(1);
```

## 迁移现有 JSON 数据

如果你有新的 JSON 配置文件需要导入：

1. 将 JSON 文件放到 `src/data/ios/` 或 `src/data/android/` 目录
2. 修改 `src/database/seed.ts`，添加新的导入
3. 运行 `pnpm prisma:seed`

## 注意事项

1. **数据库文件位置**: `prisma/devices.db`
2. **ID 格式**: 数据库中使用自增整数 ID，但在 API 中转换为字符串以保持兼容性
3. **唯一约束**: 设备通过 `name` 和 `platform` 的组合保持唯一
4. **级联删除**: 删除设备时会自动删除所有关联的配置数据

## 备份和恢复

### 备份数据库

```bash
cp prisma/devices.db prisma/devices.db.backup
```

### 恢复数据库

```bash
cp prisma/devices.db.backup prisma/devices.db
```

