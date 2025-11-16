# 日志系统使用指南

## 概述

项目使用统一的日志工具 `src/utils/logger.ts`，提供统一的日志格式和级别控制。

## 为什么不需要重型日志库？

对于本项目，**不需要引入 winston/pino 等重型日志库**，原因：

1. **项目规模适中**：主要是浏览器自动化任务，不需要复杂的日志轮转、日志聚合等功能
2. **Next.js 内置支持**：Next.js 已经提供了良好的日志基础设施
3. **简单高效**：自定义的轻量级日志工具已经足够满足需求
4. **性能考虑**：避免不必要的依赖，保持项目轻量

## 日志工具特性

### 1. 统一的日志格式

所有日志都包含：
- **时间戳**：ISO 格式的时间戳
- **日志级别**：DEBUG/INFO/WARN/ERROR
- **模块名称**：标识日志来源
- **消息内容**：具体的日志信息

示例输出：
```
[2024-01-15T10:30:45.123Z] INFO  [BrowserManager    ] 浏览器已启动: 设备=iPhone 13, 语言=ja, URL=https://example.com
```

### 2. 日志级别控制

支持 4 个日志级别（从低到高）：
- **DEBUG**：调试信息（仅在开发环境显示）
- **INFO**：一般信息（默认级别）
- **WARN**：警告信息
- **ERROR**：错误信息

### 3. 环境变量配置

通过环境变量 `LOG_LEVEL` 控制日志级别：

```bash
# 显示所有日志（包括 debug）
LOG_LEVEL=debug pnpm next:dev

# 只显示警告和错误
LOG_LEVEL=warn pnpm next:dev

# 只显示错误
LOG_LEVEL=error pnpm next:dev
```

## 使用方法

### 基本用法

```typescript
import { logger } from '@/src/utils/logger';

const MODULE_NAME = 'MyModule';

// Info 日志
logger.info(MODULE_NAME, '操作成功完成');

// Warning 日志
logger.warn(MODULE_NAME, '配置项缺失，使用默认值');

// Error 日志（自动处理 Error 对象）
logger.error(MODULE_NAME, '操作失败', error);

// Debug 日志（仅在开发环境显示）
logger.debug(MODULE_NAME, '调试信息', { data: 'value' });
```

### 在 API Routes 中使用

```typescript
import { logger } from '@/src/utils/logger';

const MODULE_NAME = 'API:MyRoute';

export async function GET() {
  try {
    logger.info(MODULE_NAME, '处理请求');
    // ...
  } catch (error) {
    logger.error(MODULE_NAME, '处理请求失败', error);
  }
}
```

### 在业务逻辑中使用

```typescript
import { logger } from '../utils/logger';

const MODULE_NAME = 'MyService';

class MyService {
  async doSomething() {
    logger.info(MODULE_NAME, '开始执行操作');
    try {
      // ...
      logger.info(MODULE_NAME, '操作完成');
    } catch (error) {
      logger.error(MODULE_NAME, '操作失败', error);
      throw error;
    }
  }
}
```

## 日志级别建议

### 开发环境
- 使用 `LOG_LEVEL=debug` 查看所有日志
- 有助于调试和问题排查

### 生产环境
- 使用 `LOG_LEVEL=info` 或 `LOG_LEVEL=warn`
- 减少日志输出，提高性能
- 只记录关键操作和错误

## 已优化的模块

以下模块已使用统一的日志工具：

- ✅ `src/lib/browser-manager.ts` - 浏览器管理器
- ✅ `app/api/browser/start/route.ts` - 启动浏览器 API
- ✅ `app/api/browser/stop/route.ts` - 停止浏览器 API
- ✅ `app/api/browser/status/route.ts` - 状态查询 API
- ✅ `src/database/database-adapter.ts` - 数据库适配器
- ✅ `src/database/seed.ts` - 数据库种子脚本

## 与 console.log 的对比

### 使用 console.log（不推荐）
```typescript
console.log('浏览器已启动');
console.error('错误:', error);
```

**问题**：
- 格式不统一
- 无法控制日志级别
- 难以追踪日志来源
- 生产环境难以过滤

### 使用 logger（推荐）
```typescript
logger.info(MODULE_NAME, '浏览器已启动');
logger.error(MODULE_NAME, '操作失败', error);
```

**优势**：
- ✅ 统一格式，易于阅读
- ✅ 支持日志级别控制
- ✅ 包含模块名称，易于追踪
- ✅ 支持环境变量配置
- ✅ 自动处理 Error 对象

## 未来扩展（如需要）

如果未来需要更强大的日志功能，可以考虑：

1. **日志文件输出**：添加文件写入功能
2. **日志轮转**：使用 `rotating-file-stream` 等库
3. **日志聚合**：集成 Sentry、LogRocket 等服务
4. **结构化日志**：输出 JSON 格式便于解析

但目前简单的日志工具已经足够满足需求。

