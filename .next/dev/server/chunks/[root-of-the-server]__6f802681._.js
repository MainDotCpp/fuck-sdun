module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/types/platform.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * 平台类型定义
 */ __turbopack_context__.s([
    "getEngineForPlatform",
    ()=>getEngineForPlatform,
    "isValidPlatform",
    ()=>isValidPlatform
]);
function getEngineForPlatform(platform) {
    switch(platform){
        case 'ios':
            return 'webkit';
        case 'android':
            return 'chromium';
        default:
            throw new Error(`Unsupported platform: ${platform}`);
    }
}
function isValidPlatform(platform) {
    return platform === 'ios' || platform === 'android';
}
}),
"[project]/src/types/device.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * 设备配置类型定义
 */ __turbopack_context__.s([
    "validateDeviceProfile",
    ()=>validateDeviceProfile
]);
function validateDeviceProfile(device) {
    // 验证必填字段
    if (!device.id) {
        throw new Error('Device profile must have an id');
    }
    if (!device.name) {
        throw new Error('Device profile must have a name');
    }
    if (!device.platform) {
        throw new Error('Device profile must have a platform');
    }
    // 验证平台类型
    if (device.platform !== 'ios' && device.platform !== 'android') {
        throw new Error(`Invalid platform: ${device.platform}. Must be 'ios' or 'android'`);
    }
    // 验证硬件参数
    if (!device.hardware) {
        throw new Error('Device profile must have hardware specification');
    }
    if (device.hardware.screenWidth <= 0 || device.hardware.screenHeight <= 0) {
        throw new Error('Invalid screen dimensions');
    }
    // 验证系统参数
    if (!device.system) {
        throw new Error('Device profile must have system specification');
    }
    // 时区和语言现在是可选的，可以通过代理IP动态设置
    // 验证浏览器参数
    if (!device.browser) {
        throw new Error('Device profile must have browser specification');
    }
    if (!device.browser.userAgent) {
        throw new Error('Device profile must have user agent');
    }
    // 验证指纹参数
    if (!device.fingerprint) {
        throw new Error('Device profile must have fingerprint specification');
    }
    // iOS 特定验证
    if (device.platform === 'ios') {
        if (device.fingerprint.deviceMemory !== undefined) {
            throw new Error('iOS devices must not have deviceMemory defined');
        }
    }
    // Android 特定验证
    if (device.platform === 'android') {
        if (device.fingerprint.deviceMemory === undefined) {
            throw new Error('Android devices should have deviceMemory defined');
        }
    }
// 验证一致性：屏幕尺寸与视口应该匹配
// 这个验证会在实际使用时进行
}
}),
"[project]/src/types/index.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/**
 * 类型定义导出
 */ __turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$platform$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/platform.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$device$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/device.ts [app-route] (ecmascript)");
;
;
}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[project]/src/utils/logger.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * 简单的日志工具
 * 统一日志格式，支持日志级别控制
 */ __turbopack_context__.s([
    "logger",
    ()=>logger
]);
class Logger {
    level;
    isDevelopment;
    constructor(){
        // 从环境变量读取日志级别，默认 info
        const envLevel = (process.env.LOG_LEVEL || 'info').toLowerCase();
        this.level = [
            'debug',
            'info',
            'warn',
            'error'
        ].includes(envLevel) ? envLevel : 'info';
        this.isDevelopment = ("TURBOPACK compile-time value", "development") !== 'production';
    }
    /**
   * 格式化日志消息
   */ format(level, module, message, ...args) {
        const timestamp = new Date().toISOString();
        const levelUpper = level.toUpperCase().padEnd(5);
        const moduleName = module.padEnd(20);
        return `[${timestamp}] ${levelUpper} [${moduleName}] ${message}`;
    }
    /**
   * 检查是否应该输出该级别的日志
   */ shouldLog(level) {
        const levels = [
            'debug',
            'info',
            'warn',
            'error'
        ];
        return levels.indexOf(level) >= levels.indexOf(this.level);
    }
    /**
   * Debug 日志（开发环境）
   */ debug(module, message, ...args) {
        if (this.shouldLog('debug') && this.isDevelopment) {
            console.debug(this.format('debug', module, message), ...args);
        }
    }
    /**
   * Info 日志
   */ info(module, message, ...args) {
        if (this.shouldLog('info')) {
            console.log(this.format('info', module, message), ...args);
        }
    }
    /**
   * Warning 日志
   */ warn(module, message, ...args) {
        if (this.shouldLog('warn')) {
            console.warn(this.format('warn', module, message), ...args);
        }
    }
    /**
   * Error 日志
   */ error(module, message, error, ...args) {
        if (this.shouldLog('error')) {
            if (error instanceof Error) {
                console.error(this.format('error', module, message), ...args, '\n', error.stack || error.message);
            } else {
                console.error(this.format('error', module, message), error, ...args);
            }
        }
    }
}
const logger = new Logger();
}),
"[project]/src/database/database-adapter.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Prisma 数据库适配器
 */ __turbopack_context__.s([
    "DatabaseAdapter",
    ()=>DatabaseAdapter
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/types/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$device$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/device.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/logger.ts [app-route] (ecmascript)");
;
;
;
const MODULE_NAME = 'DatabaseAdapter';
class DatabaseAdapter {
    prisma;
    constructor(){
        this.prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
    }
    /**
   * 关闭数据库连接
   */ async close() {
        await this.prisma.$disconnect();
    }
    /**
   * 根据 ID 获取设备配置
   */ async getDeviceById(id) {
        const device = await this.prisma.device.findUnique({
            where: {
                id
            }
        });
        if (!device) {
            return undefined;
        }
        return this.buildDeviceProfile(device);
    }
    /**
   * 根据名称和平台获取设备配置
   */ async getDeviceByName(name, platform) {
        const device = await this.prisma.device.findUnique({
            where: {
                name_platform: {
                    name,
                    platform
                }
            }
        });
        if (!device) {
            return undefined;
        }
        return this.buildDeviceProfile(device);
    }
    /**
   * 获取所有设备配置
   */ async getAllDevices() {
        const devices = await this.prisma.device.findMany({
            orderBy: {
                id: 'asc'
            }
        });
        return devices.map((device)=>this.buildDeviceProfile(device));
    }
    /**
   * 根据平台获取设备配置列表
   */ async getDevicesByPlatform(platform) {
        const devices = await this.prisma.device.findMany({
            where: {
                platform
            },
            orderBy: {
                id: 'asc'
            }
        });
        return devices.map((device)=>this.buildDeviceProfile(device));
    }
    /**
   * 构建完整的设备配置对象
   */ buildDeviceProfile(device) {
        // 解析 userAgentData
        let userAgentData = undefined;
        if (device.userAgentData) {
            try {
                userAgentData = JSON.parse(device.userAgentData);
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].debug(MODULE_NAME, 'Parsed userAgentData:', JSON.stringify(userAgentData, null, 2));
            } catch (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].warn(MODULE_NAME, 'Failed to parse userAgentData', error);
            }
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].debug(MODULE_NAME, 'No userAgentData in database record');
        }
        return {
            id: device.id.toString(),
            name: device.name,
            platform: device.platform,
            hardware: {
                cpuCores: device.cpuCores,
                memory: device.memory ?? undefined,
                screenWidth: device.screenWidth,
                screenHeight: device.screenHeight,
                devicePixelRatio: device.devicePixelRatio,
                colorDepth: device.colorDepth
            },
            system: {
                osVersion: device.osVersion,
                platform: device.systemPlatform
            },
            browser: {
                userAgent: device.userAgent,
                version: device.browserVersion,
                name: device.browserName,
                vendor: device.browserVendor,
                ...userAgentData ? {
                    userAgentData
                } : {}
            },
            fingerprint: {
                deviceMemory: device.deviceMemory ?? undefined,
                hardwareConcurrency: device.hardwareConcurrency,
                maxTouchPoints: device.maxTouchPoints,
                webglRenderer: device.webglRenderer ?? undefined,
                webglVendor: device.webglVendor ?? undefined,
                canvasNoise: device.canvasNoise ?? undefined,
                audioContextSeed: device.audioContextSeed ?? undefined,
                connectionType: device.connectionType ?? undefined,
                effectiveType: device.effectiveType ?? undefined,
                downlink: device.downlink ?? undefined,
                rtt: device.rtt ?? undefined
            }
        };
    }
    /**
   * 插入设备配置
   */ async insertDevice(device) {
        const result = await this.prisma.device.create({
            data: {
                name: device.name,
                platform: device.platform,
                // 硬件参数
                cpuCores: device.hardware.cpuCores,
                memory: device.hardware.memory ?? null,
                screenWidth: device.hardware.screenWidth,
                screenHeight: device.hardware.screenHeight,
                devicePixelRatio: device.hardware.devicePixelRatio,
                colorDepth: device.hardware.colorDepth,
                // 系统参数
                osVersion: device.system.osVersion,
                systemPlatform: device.system.platform,
                // 浏览器参数
                userAgent: device.browser.userAgent,
                browserVersion: device.browser.version,
                browserName: device.browser.name,
                browserVendor: device.browser.vendor,
                userAgentData: device.browser.userAgentData ? JSON.stringify(device.browser.userAgentData) : null,
                // 指纹参数
                deviceMemory: device.fingerprint.deviceMemory ?? null,
                hardwareConcurrency: device.fingerprint.hardwareConcurrency,
                maxTouchPoints: device.fingerprint.maxTouchPoints,
                webglRenderer: device.fingerprint.webglRenderer ?? null,
                webglVendor: device.fingerprint.webglVendor ?? null,
                canvasNoise: device.fingerprint.canvasNoise ?? null,
                audioContextSeed: device.fingerprint.audioContextSeed ?? null,
                connectionType: device.fingerprint.connectionType ?? null,
                effectiveType: device.fingerprint.effectiveType ?? null,
                downlink: device.fingerprint.downlink ?? null,
                rtt: device.fingerprint.rtt ?? null
            }
        });
        return result.id;
    }
    /**
   * 更新设备配置
   */ async updateDevice(id, device) {
        await this.prisma.device.update({
            where: {
                id
            },
            data: {
                name: device.name,
                platform: device.platform,
                // 硬件参数
                cpuCores: device.hardware.cpuCores,
                memory: device.hardware.memory ?? null,
                screenWidth: device.hardware.screenWidth,
                screenHeight: device.hardware.screenHeight,
                devicePixelRatio: device.hardware.devicePixelRatio,
                colorDepth: device.hardware.colorDepth,
                // 系统参数
                osVersion: device.system.osVersion,
                systemPlatform: device.system.platform,
                // 浏览器参数
                userAgent: device.browser.userAgent,
                browserVersion: device.browser.version,
                browserName: device.browser.name,
                browserVendor: device.browser.vendor,
                userAgentData: device.browser.userAgentData ? JSON.stringify(device.browser.userAgentData) : null,
                // 指纹参数
                deviceMemory: device.fingerprint.deviceMemory ?? null,
                hardwareConcurrency: device.fingerprint.hardwareConcurrency,
                maxTouchPoints: device.fingerprint.maxTouchPoints,
                webglRenderer: device.fingerprint.webglRenderer ?? null,
                webglVendor: device.fingerprint.webglVendor ?? null,
                canvasNoise: device.fingerprint.canvasNoise ?? null,
                audioContextSeed: device.fingerprint.audioContextSeed ?? null,
                connectionType: device.fingerprint.connectionType ?? null,
                effectiveType: device.fingerprint.effectiveType ?? null,
                downlink: device.fingerprint.downlink ?? null,
                rtt: device.fingerprint.rtt ?? null
            }
        });
    }
    /**
   * 删除设备配置
   */ async deleteDevice(id) {
        await this.prisma.device.delete({
            where: {
                id
            }
        });
    }
    /**
   * 验证设备配置
   */ validateDevice(device) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$device$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateDeviceProfile"])(device);
    }
}
}),
"[project]/src/data/index.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * 设备参数库导出和查询（使用 Prisma 数据库）
 */ __turbopack_context__.s([
    "closeDatabase",
    ()=>closeDatabase,
    "getAllDevices",
    ()=>getAllDevices,
    "getDeviceById",
    ()=>getDeviceById,
    "getDevicesByPlatform",
    ()=>getDevicesByPlatform,
    "getValidatedDevice",
    ()=>getValidatedDevice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/types/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$device$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/device.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$database$2f$database$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/database/database-adapter.ts [app-route] (ecmascript)");
;
;
// 创建数据库适配器实例（单例模式）
let dbAdapter = null;
function getDbAdapter() {
    if (!dbAdapter) {
        dbAdapter = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$database$2f$database$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DatabaseAdapter"]();
    }
    return dbAdapter;
}
async function getDeviceById(deviceId) {
    const id = parseInt(deviceId, 10);
    if (isNaN(id)) {
        return undefined;
    }
    return await getDbAdapter().getDeviceById(id);
}
async function getAllDevices() {
    return await getDbAdapter().getAllDevices();
}
async function getDevicesByPlatform(platform) {
    return await getDbAdapter().getDevicesByPlatform(platform);
}
async function getValidatedDevice(deviceId) {
    const device = await getDeviceById(deviceId);
    if (!device) {
        throw new Error(`Device not found: ${deviceId}`);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$device$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateDeviceProfile"])(device);
    return device;
}
async function closeDatabase() {
    if (dbAdapter) {
        await dbAdapter.close();
        dbAdapter = null;
    }
}
}),
"[project]/src/managers/device-manager.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * 设备管理器
 */ __turbopack_context__.s([
    "DeviceManager",
    ()=>DeviceManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/types/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$device$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/device.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/index.ts [app-route] (ecmascript)");
;
;
class DeviceManager {
    /**
   * 加载设备配置
   */ async loadDevice(deviceId) {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getValidatedDevice"])(deviceId);
    }
    /**
   * 获取所有设备配置
   */ async getAllDevices() {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAllDevices"])();
    }
    /**
   * 根据平台获取设备配置列表
   */ async getDevicesByPlatform(platform) {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDevicesByPlatform"])(platform);
    }
    /**
   * 验证设备配置
   */ validateDevice(device) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$device$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateDeviceProfile"])(device);
    }
    /**
   * 检查设备是否存在
   */ async deviceExists(deviceId) {
        const device = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDeviceById"])(deviceId);
        return device !== undefined;
    }
}
}),
"[externals]/playwright [external] (playwright, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("playwright");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/src/adapters/engine-adapter.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

/**
 * 内核适配器
 */ __turbopack_context__.s([
    "EngineAdapter",
    ()=>EngineAdapter
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$playwright__$5b$external$5d$__$28$playwright$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/playwright [external] (playwright, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/types/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$platform$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/platform.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/logger.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$playwright__$5b$external$5d$__$28$playwright$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$playwright__$5b$external$5d$__$28$playwright$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const MODULE_NAME = 'EngineAdapter';
class EngineAdapter {
    /**
   * 获取平台对应的浏览器类型
   */ getBrowserType(platform) {
        const engine = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$platform$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEngineForPlatform"])(platform);
        switch(engine){
            case 'webkit':
                return __TURBOPACK__imported__module__$5b$externals$5d2f$playwright__$5b$external$5d$__$28$playwright$2c$__esm_import$29$__["webkit"];
            case 'chromium':
                return __TURBOPACK__imported__module__$5b$externals$5d2f$playwright__$5b$external$5d$__$28$playwright$2c$__esm_import$29$__["chromium"];
            default:
                throw new Error(`Unsupported engine: ${engine}`);
        }
    }
    /**
   * 启动浏览器（带反检测配置）
   */ async launchBrowser(platform, options) {
        const browserType = this.getBrowserType(platform);
        // 合并反检测选项
        const stealthOptions = {
            ...options,
            // 反检测：隐藏自动化特征
            args: [
                ...options?.args || [],
                '--disable-blink-features=AutomationControlled',
                '--disable-dev-shm-usage',
                '--disable-setuid-sandbox',
                '--no-sandbox',
                '--disable-web-security',
                '--disable-features=IsolateOrigins,site-per-process',
                '--disable-site-isolation-trials',
                // 禁用自动化标识
                '--disable-automation',
                // 模拟真实浏览器
                '--disable-infobars',
                '--disable-notifications',
                '--disable-popup-blocking',
                // 禁用密码保存提示
                '--disable-save-password-bubble',
                // 使用真实的用户代理
                '--user-agent=' + (options?.headless === false ? undefined : '')
            ].filter(Boolean)
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].debug(MODULE_NAME, `启动浏览器: ${platform}, 引擎: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$platform$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEngineForPlatform"])(platform)}`);
        const browser = await browserType.launch(stealthOptions);
        return browser;
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/strategies/ios-strategy.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * iOS 指纹策略实现
 */ __turbopack_context__.s([
    "IOSFingerprintStrategy",
    ()=>IOSFingerprintStrategy
]);
class IOSFingerprintStrategy {
    /**
   * 验证平台兼容性
   */ validatePlatform(device) {
        if (device.platform !== 'ios') {
            throw new Error(`IOSFingerprintStrategy only supports iOS devices, got: ${device.platform}`);
        }
        if (device.fingerprint.deviceMemory !== undefined) {
            throw new Error('iOS devices must not have deviceMemory defined');
        }
    }
    /**
   * 生成 iOS 指纹注入脚本
   */ generateScript(device, localeOptions) {
        this.validatePlatform(device);
        const { hardware, system, browser, fingerprint } = device;
        // 使用传入的时区和语言选项，如果没有则使用设备配置中的值，再没有则使用默认值
        const timezoneId = localeOptions?.timezoneId || system.timezoneId || 'UTC';
        const language = localeOptions?.language || system.language || 'en-US';
        const languages = localeOptions?.languages || system.languages || [
            language
        ];
        return `
(function() {
  'use strict';
  
  // 修改 Navigator 对象
  Object.defineProperty(navigator, 'deviceMemory', {
    get: () => undefined,
    configurable: true
  });
  
  Object.defineProperty(navigator, 'hardwareConcurrency', {
    get: () => ${fingerprint.hardwareConcurrency},
    configurable: true
  });
  
  Object.defineProperty(navigator, 'maxTouchPoints', {
    get: () => ${fingerprint.maxTouchPoints},
    configurable: true
  });
  
  Object.defineProperty(navigator, 'platform', {
    get: () => '${system.platform}',
    configurable: true
  });
  
  Object.defineProperty(navigator, 'language', {
    get: () => '${language}',
    configurable: true
  });
  
  Object.defineProperty(navigator, 'languages', {
    get: () => ${JSON.stringify(languages)},
    configurable: true
  });
  
  Object.defineProperty(navigator, 'vendor', {
    get: () => '${browser.vendor}',
    configurable: true
  });
  
  // iOS 设备 plugins 和 mimeTypes 必须为空数组
  Object.defineProperty(navigator, 'plugins', {
    get: () => [],
    configurable: true
  });
  
  Object.defineProperty(navigator, 'mimeTypes', {
    get: () => [],
    configurable: true
  });
  
  // 修改屏幕属性
  Object.defineProperty(screen, 'width', {
    get: () => ${hardware.screenWidth},
    configurable: true
  });
  
  Object.defineProperty(screen, 'height', {
    get: () => ${hardware.screenHeight},
    configurable: true
  });
  
  Object.defineProperty(screen, 'availWidth', {
    get: () => ${hardware.screenWidth},
    configurable: true
  });
  
  Object.defineProperty(screen, 'availHeight', {
    get: () => ${hardware.screenHeight},
    configurable: true
  });
  
  Object.defineProperty(screen, 'colorDepth', {
    get: () => ${hardware.colorDepth},
    configurable: true
  });
  
  Object.defineProperty(screen, 'pixelDepth', {
    get: () => ${hardware.colorDepth},
    configurable: true
  });
  
  // 修改设备像素比
  Object.defineProperty(window, 'devicePixelRatio', {
    get: () => ${hardware.devicePixelRatio},
    configurable: true
  });
  
  // 修改 WebGL 参数
  const getParameter = WebGLRenderingContext.prototype.getParameter;
  WebGLRenderingContext.prototype.getParameter = function(parameter) {
    if (parameter === 37445) { // UNMASKED_VENDOR_WEBGL
      return '${fingerprint.webglVendor || ''}';
    }
    if (parameter === 37446) { // UNMASKED_RENDERER_WEBGL
      return '${fingerprint.webglRenderer || ''}';
    }
    // 处理 WebGL 限制参数，使用真实设备的典型值
    if (parameter === 3379) { // MAX_TEXTURE_SIZE
      return 16384;
    }
    if (parameter === 34024) { // MAX_RENDERBUFFER_SIZE
      return 16384;
    }
    if (parameter === 34817 || parameter === 36347) { // MAX_VARYING_VECTORS / MAX_VARYING_FLOATS
      return 30;
    }
    return getParameter.call(this, parameter);
  };
  
  const getParameter2 = WebGL2RenderingContext.prototype.getParameter;
  WebGL2RenderingContext.prototype.getParameter = function(parameter) {
    if (parameter === 37445) {
      return '${fingerprint.webglVendor || ''}';
    }
    if (parameter === 37446) {
      return '${fingerprint.webglRenderer || ''}';
    }
    if (parameter === 3379) {
      return 16384;
    }
    if (parameter === 34024) {
      return 16384;
    }
    if (parameter === 34817 || parameter === 36347) {
      return 30;
    }
    return getParameter2.call(this, parameter);
  };
  
  // 修改 Canvas 指纹
  const toBlob = HTMLCanvasElement.prototype.toBlob;
  const toDataURL = HTMLCanvasElement.prototype.toDataURL;
  const getImageData = CanvasRenderingContext2D.prototype.getImageData;
  
  HTMLCanvasElement.prototype.toBlob = function(callback, type, quality) {
    const canvas = this;
    const context = canvas.getContext('2d');
    if (context) {
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      // 随机生成噪声值（每次调用保持一致）
      const noise = ${Math.random()};
      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, Math.max(0, data[i] + noise * 0.1));
      }
      context.putImageData(imageData, 0, 0);
    }
    return toBlob.call(this, callback, type, quality);
  };
  
  HTMLCanvasElement.prototype.toDataURL = function(type, quality) {
    const canvas = this;
    const context = canvas.getContext('2d');
    if (context) {
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      // 随机生成噪声值（每次调用保持一致）
      const noise = ${Math.random()};
      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, Math.max(0, data[i] + noise * 0.1));
      }
      context.putImageData(imageData, 0, 0);
    }
    return toDataURL.call(this, type, quality);
  };
  
  // 修改 AudioContext 指纹
  const createAnalyser = AudioContext.prototype.createAnalyser;
  AudioContext.prototype.createAnalyser = function() {
    const analyser = createAnalyser.call(this);
    const getFloatFrequencyData = analyser.getFloatFrequencyData;
    analyser.getFloatFrequencyData = function(array) {
      getFloatFrequencyData.call(this, array);
      // 随机生成种子值（每次调用保持一致）
      const seed = ${Math.random()};
      for (let i = 0; i < array.length; i++) {
        array[i] += seed * 0.0001;
      }
    };
    return analyser;
  };
  
  // 修改网络信息
  if (navigator.connection) {
    Object.defineProperty(navigator.connection, 'type', {
      get: () => '${fingerprint.connectionType || 'wifi'}',
      configurable: true
    });
    
    Object.defineProperty(navigator.connection, 'effectiveType', {
      get: () => '${fingerprint.effectiveType || '4g'}',
      configurable: true
    });
    
    Object.defineProperty(navigator.connection, 'downlink', {
      get: () => ${fingerprint.downlink || 10},
      configurable: true
    });
    
    Object.defineProperty(navigator.connection, 'rtt', {
      get: () => ${fingerprint.rtt || 50},
      configurable: true
    });
  }
  
  // 修改 window.innerWidth 和 innerHeight（需要与 viewport 匹配）
  // 强制设置视口宽度，避免浏览器最小宽度限制导致的白边问题
  Object.defineProperty(window, 'innerWidth', {
    get: () => ${hardware.screenWidth},
    configurable: true
  });
  
  Object.defineProperty(window, 'innerHeight', {
    get: () => ${hardware.screenHeight},
    configurable: true
  });
  
  // 修复浏览器最小宽度限制导致的白边问题
  // 在页面加载时强制设置视口宽度并隐藏水平滚动
  (function fixMinWidth() {
    // 设置 viewport meta 标签
    const setViewport = function() {
      let viewport = document.querySelector('meta[name="viewport"]');
      if (!viewport) {
        viewport = document.createElement('meta');
        viewport.setAttribute('name', 'viewport');
        document.head.appendChild(viewport);
      }
      viewport.setAttribute('content', 'width=${hardware.screenWidth}, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    };
    
    // 立即执行
    if (document.head) {
      setViewport();
    } else {
      document.addEventListener('DOMContentLoaded', setViewport);
    }
    
    // 添加 CSS 防止白边和水平滚动
    const style = document.createElement('style');
    style.textContent = \`
      html, body {
        width: ${hardware.screenWidth}px !important;
        max-width: ${hardware.screenWidth}px !important;
        overflow-x: hidden !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      * {
        max-width: 100% !important;
        box-sizing: border-box !important;
      }
    \`;
    
    if (document.head) {
      document.head.appendChild(style);
    } else {
      document.addEventListener('DOMContentLoaded', function() {
        document.head.appendChild(style);
      });
    }
    
    // 强制设置 body 宽度
    const setBodyWidth = function() {
      if (document.body) {
        document.body.style.width = '${hardware.screenWidth}px';
        document.body.style.maxWidth = '${hardware.screenWidth}px';
        document.body.style.overflowX = 'hidden';
      }
    };
    
    if (document.body) {
      setBodyWidth();
    } else {
      document.addEventListener('DOMContentLoaded', setBodyWidth);
    }
    
    // 监听窗口大小变化，确保宽度一致
    window.addEventListener('resize', function() {
      if (window.innerWidth !== ${hardware.screenWidth}) {
        document.documentElement.style.width = '${hardware.screenWidth}px';
        document.documentElement.style.maxWidth = '${hardware.screenWidth}px';
        if (document.body) {
          document.body.style.width = '${hardware.screenWidth}px';
          document.body.style.maxWidth = '${hardware.screenWidth}px';
        }
      }
    });
  })();
  
  // 修改时区和 Intl API
  const originalDate = Date;
  const originalGetTimezoneOffset = Date.prototype.getTimezoneOffset;
  Date.prototype.getTimezoneOffset = function() {
    // 根据时区ID计算偏移（简化处理，实际应该完整实现）
    const timezoneId = '${timezoneId}';
    // 这里应该根据时区ID计算实际偏移，暂时使用原始值
    return originalGetTimezoneOffset.call(this);
  };
  
  // 修改 Intl.DateTimeFormat 的 resolvedOptions
  const originalResolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions;
  Intl.DateTimeFormat.prototype.resolvedOptions = function() {
    const options = originalResolvedOptions.call(this);
    options.timeZone = '${timezoneId}';
    return options;
  };
  
  // iOS 特殊能力：ApplePaySession（仅在 iOS Safari 中存在）
  if (!window.ApplePaySession) {
    window.ApplePaySession = function() {};
    window.ApplePaySession.supportsVersion = function(version) {
      return version === 3;
    };
    window.ApplePaySession.canMakePayments = function() {
      return false;
    };
  }
  
  // iOS PWA standalone 模式
  Object.defineProperty(navigator, 'standalone', {
    get: () => false,
    configurable: true,
    enumerable: true
  });
  
  // 处理 userAgentData (Client Hints API)
  // 优化：使用 Proxy 隐藏属性描述符，避免被检测脚本发现 configurable: true
  if (!navigator.userAgentData) {
    // 优化：使用 Function 构造函数创建 getHighEntropyValues，避免 Promise.resolve 特征
    const getHighEntropyValuesCode = [
      'var result = {',
      '  platform: ' + ${JSON.stringify(system.platform)} + ',',
      '  platformVersion: ' + ${JSON.stringify(system.osVersion)} + ',',
      '  model: ' + ${JSON.stringify('iPhone')} + ',',
      '  mobile: true',
      '};',
      'var p = new Promise(function(r) { r(result); });',
      'return p;'
    ].join('\\n');
    
    const getHighEntropyValuesFn = new Function('hints', getHighEntropyValuesCode);
    
    // 优化：修改 getHighEntropyValues 的 toString，使其返回 [native code]
    Object.defineProperty(getHighEntropyValuesFn, 'toString', {
      value: function toString() { return 'function getHighEntropyValues() { [native code] }'; },
      writable: false,
      configurable: false,
      enumerable: false
    });
    
    const userAgentDataValue = {
      platform: '${system.platform}',
      brands: [
        { brand: 'Safari', version: '${browser.version}' }
      ],
      mobile: true,
      getHighEntropyValues: getHighEntropyValuesFn
    };
    
    // 优化：拦截 Object.getOwnPropertyDescriptor，隐藏属性描述符的真实值
    // 必须在定义属性之前设置拦截器
    const originalGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    Object.getOwnPropertyDescriptor = function(obj, prop) {
      if (obj === navigator && prop === 'userAgentData') {
        // 返回一个假的描述符，显示 configurable: false
        const realDesc = originalGetOwnPropertyDescriptor.call(Object, obj, prop);
        if (realDesc) {
          return {
            get: realDesc.get,
            set: realDesc.set,
            enumerable: realDesc.enumerable,
            configurable: false,  // 伪装成不可配置
            writable: false
          };
        }
      }
      return originalGetOwnPropertyDescriptor.call(Object, obj, prop);
    };
    
    // 定义 userAgentData 属性
    Object.defineProperty(navigator, 'userAgentData', {
      get: () => userAgentDataValue,
      configurable: true,  // 实际设置为 true（因为 false 会失败）
      enumerable: true
    });
  }
  
})();
`.trim();
    }
}
}),
"[project]/src/strategies/android-strategy.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Android 指纹策略实现
 */ __turbopack_context__.s([
    "AndroidFingerprintStrategy",
    ()=>AndroidFingerprintStrategy
]);
class AndroidFingerprintStrategy {
    /**
   * 验证平台兼容性
   */ validatePlatform(device) {
        if (device.platform !== 'android') {
            throw new Error(`AndroidFingerprintStrategy only supports Android devices, got: ${device.platform}`);
        }
        if (device.fingerprint.deviceMemory === undefined) {
            throw new Error('Android devices should have deviceMemory defined');
        }
    }
    /**
   * 生成 Android 指纹注入脚本
   */ generateScript(device, localeOptions) {
        this.validatePlatform(device);
        const { hardware, system, browser, fingerprint } = device;
        // 使用传入的时区和语言选项，如果没有则使用设备配置中的值，再没有则使用默认值
        const timezoneId = localeOptions?.timezoneId || system.timezoneId || 'UTC';
        const language = localeOptions?.language || system.language || 'en-US';
        const languages = localeOptions?.languages || system.languages || [
            language
        ];
        return `
(function() {
  'use strict';
  
  // 在页面加载前立即执行，确保在所有检测代码运行前完成修改
  // 使用立即执行函数避免污染全局作用域
  
  // 修改 Navigator 对象
  Object.defineProperty(navigator, 'deviceMemory', {
    get: () => ${fingerprint.deviceMemory},
    configurable: true
  });
  
  Object.defineProperty(navigator, 'hardwareConcurrency', {
    get: () => ${fingerprint.hardwareConcurrency},
    configurable: true
  });
  
  Object.defineProperty(navigator, 'maxTouchPoints', {
    get: () => ${fingerprint.maxTouchPoints},
    configurable: true
  });
  
  // navigator.platform 对于 Android 设备，通常返回 "Linux armv8l" 或类似值
  // 但检测平台可能会检查这个值，保持与配置一致
  Object.defineProperty(navigator, 'platform', {
    get: () => '${system.platform}',
    configurable: true
  });
  
  Object.defineProperty(navigator, 'language', {
    get: () => '${language}',
    configurable: true
  });
  
  Object.defineProperty(navigator, 'languages', {
    get: () => ${JSON.stringify(languages)},
    configurable: true
  });
  
  Object.defineProperty(navigator, 'vendor', {
    get: () => '${browser.vendor}',
    configurable: true
  });
  
  // Android Chrome 特有：plugins 和 mimeTypes 应该有内容（与 iOS 不同）
  // iOS Safari 的 plugins 和 mimeTypes 为空数组，但 Android Chrome 有插件
  // 创建模拟的 Chrome 插件列表
  (function() {
    const chromePlugins = [];
    
    // Chrome PDF Plugin
    const pdfPlugin = {
      name: 'Chrome PDF Plugin',
      description: 'Portable Document Format',
      filename: 'internal-pdf-viewer',
      length: 1
    };
    pdfPlugin['0'] = {
      type: 'application/pdf',
      suffixes: 'pdf',
      description: 'Portable Document Format',
      enabledPlugin: pdfPlugin
    };
    chromePlugins.push(pdfPlugin);
    
    // Chrome PDF Viewer
    const pdfViewer = {
      name: 'Chrome PDF Viewer',
      description: '',
      filename: 'mhjfbmdgcfjbbpaeojofohoefgiehjai',
      length: 1
    };
    pdfViewer['0'] = {
      type: 'application/pdf',
      suffixes: 'pdf',
      description: '',
      enabledPlugin: pdfViewer
    };
    chromePlugins.push(pdfViewer);
    
    // Native Client
    const naclPlugin = {
      name: 'Native Client',
      description: '',
      filename: 'internal-nacl-plugin',
      length: 2
    };
    naclPlugin['0'] = {
      type: 'application/x-nacl',
      suffixes: '',
      description: 'Native Client Executable',
      enabledPlugin: naclPlugin
    };
    naclPlugin['1'] = {
      type: 'application/x-pnacl',
      suffixes: '',
      description: 'Portable Native Client Executable',
      enabledPlugin: naclPlugin
    };
    chromePlugins.push(naclPlugin);
    
    Object.defineProperty(navigator, 'plugins', {
      get: () => chromePlugins,
      configurable: true
    });
    
    // 创建对应的 mimeTypes
    const chromeMimeTypes = [];
    chromePlugins.forEach(function(plugin) {
      for (let i = 0; i < plugin.length; i++) {
        chromeMimeTypes.push(plugin[i.toString()]);
      }
    });
    
    Object.defineProperty(navigator, 'mimeTypes', {
      get: () => chromeMimeTypes,
      configurable: true
    });
  })();
  
  // 修改屏幕属性
  Object.defineProperty(screen, 'width', {
    get: () => ${hardware.screenWidth},
    configurable: true
  });
  
  Object.defineProperty(screen, 'height', {
    get: () => ${hardware.screenHeight},
    configurable: true
  });
  
  Object.defineProperty(screen, 'availWidth', {
    get: () => ${hardware.screenWidth},
    configurable: true
  });
  
  Object.defineProperty(screen, 'availHeight', {
    get: () => ${hardware.screenHeight},
    configurable: true
  });
  
  Object.defineProperty(screen, 'colorDepth', {
    get: () => ${hardware.colorDepth},
    configurable: true
  });
  
  Object.defineProperty(screen, 'pixelDepth', {
    get: () => ${hardware.colorDepth},
    configurable: true
  });
  
  // 修改设备像素比
  Object.defineProperty(window, 'devicePixelRatio', {
    get: () => ${hardware.devicePixelRatio},
    configurable: true
  });
  
  // 修改 WebGL 参数
  const getParameter = WebGLRenderingContext.prototype.getParameter;
  WebGLRenderingContext.prototype.getParameter = function(parameter) {
    if (parameter === 37445) { // UNMASKED_VENDOR_WEBGL
      return '${fingerprint.webglVendor || ''}';
    }
    if (parameter === 37446) { // UNMASKED_RENDERER_WEBGL
      return '${fingerprint.webglRenderer || ''}';
    }
    // 处理 WebGL 限制参数，使用真实设备的典型值
    if (parameter === 3379) { // MAX_TEXTURE_SIZE
      return 16384;
    }
    if (parameter === 34024) { // MAX_RENDERBUFFER_SIZE
      return 16384;
    }
    if (parameter === 34817 || parameter === 36347) { // MAX_VARYING_VECTORS / MAX_VARYING_FLOATS
      return 30;
    }
    return getParameter.call(this, parameter);
  };
  
  const getParameter2 = WebGL2RenderingContext.prototype.getParameter;
  WebGL2RenderingContext.prototype.getParameter = function(parameter) {
    if (parameter === 37445) {
      return '${fingerprint.webglVendor || ''}';
    }
    if (parameter === 37446) {
      return '${fingerprint.webglRenderer || ''}';
    }
    if (parameter === 3379) {
      return 16384;
    }
    if (parameter === 34024) {
      return 16384;
    }
    if (parameter === 34817 || parameter === 36347) {
      return 30;
    }
    return getParameter2.call(this, parameter);
  };
  
  // 修改 Canvas 指纹
  const toBlob = HTMLCanvasElement.prototype.toBlob;
  const toDataURL = HTMLCanvasElement.prototype.toDataURL;
  const getImageData = CanvasRenderingContext2D.prototype.getImageData;
  
  HTMLCanvasElement.prototype.toBlob = function(callback, type, quality) {
    const canvas = this;
    const context = canvas.getContext('2d');
    if (context) {
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      // 随机生成噪声值（每次调用保持一致）
      const noise = ${Math.random()};
      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, Math.max(0, data[i] + noise * 0.1));
      }
      context.putImageData(imageData, 0, 0);
    }
    return toBlob.call(this, callback, type, quality);
  };
  
  HTMLCanvasElement.prototype.toDataURL = function(type, quality) {
    const canvas = this;
    const context = canvas.getContext('2d');
    if (context) {
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      // 随机生成噪声值（每次调用保持一致）
      const noise = ${Math.random()};
      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, Math.max(0, data[i] + noise * 0.1));
      }
      context.putImageData(imageData, 0, 0);
    }
    return toDataURL.call(this, type, quality);
  };
  
  // 修改 AudioContext 指纹
  const createAnalyser = AudioContext.prototype.createAnalyser;
  AudioContext.prototype.createAnalyser = function() {
    const analyser = createAnalyser.call(this);
    const getFloatFrequencyData = analyser.getFloatFrequencyData;
    analyser.getFloatFrequencyData = function(array) {
      getFloatFrequencyData.call(this, array);
      // 随机生成种子值（每次调用保持一致）
      const seed = ${Math.random()};
      for (let i = 0; i < array.length; i++) {
        array[i] += seed * 0.0001;
      }
    };
    return analyser;
  };
  
  // 修改网络信息
  if (navigator.connection) {
    Object.defineProperty(navigator.connection, 'type', {
      get: () => '${fingerprint.connectionType || 'wifi'}',
      configurable: true
    });
    
    Object.defineProperty(navigator.connection, 'effectiveType', {
      get: () => '${fingerprint.effectiveType || '4g'}',
      configurable: true
    });
    
    Object.defineProperty(navigator.connection, 'downlink', {
      get: () => ${fingerprint.downlink || 10},
      configurable: true
    });
    
    Object.defineProperty(navigator.connection, 'rtt', {
      get: () => ${fingerprint.rtt || 50},
      configurable: true
    });
  }
  
  // 修改 window.innerWidth 和 innerHeight（需要与 viewport 匹配）
  // 强制设置视口宽度，避免 Chrome 最小宽度限制导致的白边问题
  Object.defineProperty(window, 'innerWidth', {
    get: () => ${hardware.screenWidth},
    configurable: true
  });
  
  Object.defineProperty(window, 'innerHeight', {
    get: () => ${hardware.screenHeight},
    configurable: true
  });
  
  // 修复 Chrome 最小宽度限制导致的白边问题
  // 在页面加载时强制设置视口宽度并隐藏水平滚动
  (function fixChromeMinWidth() {
    // 设置 viewport meta 标签
    const setViewport = function() {
      let viewport = document.querySelector('meta[name="viewport"]');
      if (!viewport) {
        viewport = document.createElement('meta');
        viewport.setAttribute('name', 'viewport');
        document.head.appendChild(viewport);
      }
      viewport.setAttribute('content', 'width=${hardware.screenWidth}, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    };
    
    // 立即执行
    if (document.head) {
      setViewport();
    } else {
      document.addEventListener('DOMContentLoaded', setViewport);
    }
    
    // 添加 CSS 防止白边和水平滚动
    const style = document.createElement('style');
    style.textContent = \`
      html, body {
        width: ${hardware.screenWidth}px !important;
        max-width: ${hardware.screenWidth}px !important;
        overflow-x: hidden !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      * {
        max-width: 100% !important;
        box-sizing: border-box !important;
      }
    \`;
    
    if (document.head) {
      document.head.appendChild(style);
    } else {
      document.addEventListener('DOMContentLoaded', function() {
        document.head.appendChild(style);
      });
    }
    
    // 强制设置 body 宽度
    const setBodyWidth = function() {
      if (document.body) {
        document.body.style.width = '${hardware.screenWidth}px';
        document.body.style.maxWidth = '${hardware.screenWidth}px';
        document.body.style.overflowX = 'hidden';
      }
    };
    
    if (document.body) {
      setBodyWidth();
    } else {
      document.addEventListener('DOMContentLoaded', setBodyWidth);
    }
    
    // 监听窗口大小变化，确保宽度一致
    window.addEventListener('resize', function() {
      if (window.innerWidth !== ${hardware.screenWidth}) {
        document.documentElement.style.width = '${hardware.screenWidth}px';
        document.documentElement.style.maxWidth = '${hardware.screenWidth}px';
        if (document.body) {
          document.body.style.width = '${hardware.screenWidth}px';
          document.body.style.maxWidth = '${hardware.screenWidth}px';
        }
      }
    });
  })();
  
  // 修改时区和 Intl API
  const originalDate = Date;
  const originalGetTimezoneOffset = Date.prototype.getTimezoneOffset;
  Date.prototype.getTimezoneOffset = function() {
    // 根据时区ID计算偏移（简化处理，实际应该完整实现）
    const timezoneId = '${timezoneId}';
    // 这里应该根据时区ID计算实际偏移，暂时使用原始值
    return originalGetTimezoneOffset.call(this);
  };
  
  // 修改 Intl.DateTimeFormat 的 resolvedOptions
  const originalResolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions;
  Intl.DateTimeFormat.prototype.resolvedOptions = function() {
    const options = originalResolvedOptions.call(this);
    options.timeZone = '${timezoneId}';
    return options;
  };
  
})();
`.trim();
    }
}
}),
"[project]/src/injectors/fingerprint-injector.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * 指纹注入器
 */ __turbopack_context__.s([
    "FingerprintInjector",
    ()=>FingerprintInjector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$strategies$2f$ios$2d$strategy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/strategies/ios-strategy.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$strategies$2f$android$2d$strategy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/strategies/android-strategy.ts [app-route] (ecmascript)");
;
;
class FingerprintInjector {
    strategies;
    constructor(){
        this.strategies = new Map();
        this.strategies.set('ios', new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$strategies$2f$ios$2d$strategy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IOSFingerprintStrategy"]());
        this.strategies.set('android', new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$strategies$2f$android$2d$strategy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AndroidFingerprintStrategy"]());
    }
    /**
   * 获取对应平台的指纹策略
   */ getStrategy(platform) {
        const strategy = this.strategies.get(platform);
        if (!strategy) {
            throw new Error(`Unsupported platform: ${platform}`);
        }
        return strategy;
    }
    /**
   * 注入指纹到浏览器上下文
   */ async inject(context, device, localeOptions) {
        const strategy = this.getStrategy(device.platform);
        const script = strategy.generateScript(device, localeOptions);
        // 在页面加载前注入脚本
        await context.addInitScript(script);
    }
}
}),
"[project]/src/configurators/context-configurator.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * 浏览器上下文配置器
 */ __turbopack_context__.s([
    "ContextConfigurator",
    ()=>ContextConfigurator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$injectors$2f$fingerprint$2d$injector$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/injectors/fingerprint-injector.ts [app-route] (ecmascript)");
;
class ContextConfigurator {
    fingerprintInjector;
    constructor(){
        this.fingerprintInjector = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$injectors$2f$fingerprint$2d$injector$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FingerprintInjector"]();
    }
    /**
   * 解析代理字符串
   * 格式：host:port:username:password 或 host:port
   */ parseProxy(proxyString) {
        const parts = proxyString.split(':');
        if (parts.length === 2) {
            // host:port
            return {
                server: `http://${parts[0]}:${parts[1]}`
            };
        } else if (parts.length === 4) {
            // host:port:username:password
            return {
                server: `http://${parts[0]}:${parts[1]}`,
                username: parts[2],
                password: parts[3]
            };
        } else {
            throw new Error(`Invalid proxy format: ${proxyString}. Expected format: host:port or host:port:username:password`);
        }
    }
    /**
   * 从语言轮询列表中选择语言（简单轮询）
   */ selectLanguageFromRotation(languageRotation) {
        // 使用时间戳进行简单轮询
        const index = Math.floor(Date.now() / 1000) % languageRotation.length;
        return languageRotation[index];
    }
    /**
   * 创建浏览器上下文
   */ async createContext(browser, device, options) {
        const { hardware, system, browser: browserSpec } = device;
        // 处理语言：优先使用轮询列表，然后是直接指定的语言，最后使用设备配置
        let language;
        let languages;
        if (options?.languageRotation && options.languageRotation.length > 0) {
            // 使用语言轮询
            language = this.selectLanguageFromRotation(options.languageRotation);
            languages = options.languageRotation;
        } else if (options?.language) {
            // 使用指定的语言
            language = options.language;
            languages = options.languages || [
                language
            ];
        } else {
            // 使用设备配置中的语言
            language = system.language || 'en-US';
            languages = system.languages || [
                language
            ];
        }
        // 使用选项中的时区，如果没有则使用设备配置中的值，再没有则使用默认值
        const timezoneId = options?.timezoneId || system.timezoneId || 'UTC';
        // 处理代理配置
        let proxyConfig;
        if (options?.proxy) {
            if (typeof options.proxy === 'string') {
                proxyConfig = this.parseProxy(options.proxy);
            } else {
                proxyConfig = options.proxy;
            }
        }
        // 创建上下文配置
        const contextOptions = {
            viewport: {
                width: hardware.screenWidth,
                height: hardware.screenHeight
            },
            userAgent: browserSpec.userAgent,
            locale: language,
            timezoneId: timezoneId,
            deviceScaleFactor: hardware.devicePixelRatio,
            colorScheme: 'light',
            ...proxyConfig && {
                proxy: proxyConfig
            },
            ...device.platform === 'ios' && {
                // iOS 特定配置
                isMobile: true,
                hasTouch: true
            },
            ...device.platform === 'android' && {
                // Android 特定配置
                isMobile: true,
                hasTouch: true
            },
            ...options?.contextOptions
        };
        // 创建上下文
        const context = await browser.newContext(contextOptions);
        // 注入指纹（传递时区和语言信息）
        await this.fingerprintInjector.inject(context, device, {
            timezoneId,
            language,
            languages
        });
        return context;
    }
    /**
   * 创建页面
   */ async createPage(context) {
        return await context.newPage();
    }
}
}),
"[project]/src/index.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

/**
 * 主入口文件
 */ __turbopack_context__.s([
    "createMobileBrowser",
    ()=>createMobileBrowser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$managers$2f$device$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/managers/device-manager.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$adapters$2f$engine$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/adapters/engine-adapter.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configurators$2f$context$2d$configurator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/configurators/context-configurator.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$injectors$2f$fingerprint$2d$injector$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/injectors/fingerprint-injector.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$strategies$2f$ios$2d$strategy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/strategies/ios-strategy.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$strategies$2f$android$2d$strategy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/strategies/android-strategy.ts [app-route] (ecmascript)");
// 导出设备数据
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/index.ts [app-route] (ecmascript)");
// 导出数据库适配器
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$database$2f$database$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/database/database-adapter.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$adapters$2f$engine$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$adapters$2f$engine$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
async function createMobileBrowser(deviceId, options) {
    // 1. 加载设备配置
    const deviceManager = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$managers$2f$device$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DeviceManager"]();
    const device = await deviceManager.loadDevice(deviceId);
    // 2. 选择浏览器引擎并启动浏览器
    const engineAdapter = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$adapters$2f$engine$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EngineAdapter"]();
    const launchOptions = options?.launchOptions ? {
        ...options.launchOptions
    } : {};
    const browser = await engineAdapter.launchBrowser(device.platform, {
        headless: options?.headless ?? false,
        ...launchOptions
    });
    try {
        // 3. 创建上下文并注入指纹
        const contextConfigurator = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configurators$2f$context$2d$configurator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ContextConfigurator"]();
        const context = await contextConfigurator.createContext(browser, device, options);
        // 4. 创建页面
        const page = await contextConfigurator.createPage(context);
        return {
            browser,
            context,
            page
        };
    } catch (error) {
        // 如果创建上下文或页面失败，关闭浏览器
        await browser.close();
        throw error;
    }
}
;
;
;
;
;
;
;
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/config/proxy-config.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * 922proxy 代理配置
 * 硬编码在程序中，国家固定为日本，城市随机选择
 */ /**
 * 日本主要城市列表（用于随机选择）
 */ __turbopack_context__.s([
    "FIXED_PROXY",
    ()=>FIXED_PROXY,
    "JAPAN_CITIES",
    ()=>JAPAN_CITIES,
    "PROXY_CONFIG",
    ()=>PROXY_CONFIG,
    "getRandomJapanCity",
    ()=>getRandomJapanCity
]);
const JAPAN_CITIES = [
    'Tokyo',
    'Osaka',
    'Yokohama',
    'Nagoya',
    'Sapporo',
    'Fukuoka',
    'Kobe',
    'Kyoto',
    'Kawasaki',
    'Saitama',
    'Hiroshima',
    'Sendai',
    'Chiba',
    'Kitakyushu',
    'Sakai',
    'Niigata',
    'Hamamatsu',
    'Kumamoto',
    'Sagamihara',
    'Shizuoka'
];
const FIXED_PROXY = 'as.proxys5.net:6200:30356354-zone-custom-region-JP:nRNz4Tsx';
const PROXY_CONFIG = {
    /** API Token */ token: '49d8d3b0-a8a7-419e-ada4-8afd27aecb9f',
    /** API Key */ key: 'sLPLLr5nhDPl',
    /** 用户名 */ username: 'shengdunapi',
    /** 主机名：端口 */ hostname: 'Singapore',
    /** API 地址 */ apiUrl: 'https://docapi.922proxy.com/api/proxy/isp_generate',
    /** 国家（固定为日本） */ country: 'Japan'
};
function getRandomJapanCity() {
    const randomIndex = Math.floor(Math.random() * JAPAN_CITIES.length);
    return JAPAN_CITIES[randomIndex];
}
}),
"[project]/src/services/proxy-service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * 922proxy ISP 代理服务
 * 用于从 922proxy API 获取代理配置
 */ __turbopack_context__.s([
    "ProxyService",
    ()=>ProxyService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/logger.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$proxy$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/proxy-config.ts [app-route] (ecmascript)");
;
;
const MODULE_NAME = 'ProxyService';
class ProxyService {
    config;
    constructor(config){
        this.config = {
            ...config,
            apiUrl: config.apiUrl || 'https://docapi.922proxy.com/api/proxy/isp_generate'
        };
    }
    /**
   * 创建默认配置的 ProxyService 实例（日本+随机城市）
   */ static createDefault() {
        // 检查配置是否完整（检查是否为默认占位符值）
        const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$proxy$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PROXY_CONFIG"].token;
        const key = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$proxy$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PROXY_CONFIG"].key;
        const username = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$proxy$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PROXY_CONFIG"].username;
        if (token === 'your_token_here' || key === 'your_key_here' || username === 'your_username_here' || !token || !key || !username) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].warn(MODULE_NAME, '922proxy 配置未设置，请在 src/config/proxy-config.ts 中配置 token、key 和 username');
            return null;
        }
        // 随机选择一个日本城市
        const city = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$proxy$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRandomJapanCity"])();
        return new ProxyService({
            token: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$proxy$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PROXY_CONFIG"].token,
            key: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$proxy$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PROXY_CONFIG"].key,
            username: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$proxy$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PROXY_CONFIG"].username,
            country: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$proxy$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PROXY_CONFIG"].country,
            city,
            hostname: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$proxy$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PROXY_CONFIG"].hostname,
            apiUrl: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$proxy$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PROXY_CONFIG"].apiUrl
        });
    }
    /**
   * 从环境变量创建 ProxyService 实例（保留用于兼容性）
   */ static fromEnv() {
        const token = process.env.PROXY_922_TOKEN;
        const key = process.env.PROXY_922_KEY;
        const username = process.env.PROXY_922_USERNAME;
        const country = process.env.PROXY_922_COUNTRY;
        const city = process.env.PROXY_922_CITY;
        const hostname = process.env.PROXY_922_HOSTNAME;
        if (!token || !key || !username || !country || !city || !hostname) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].warn(MODULE_NAME, '922proxy 配置不完整，跳过代理获取。需要环境变量: PROXY_922_TOKEN, PROXY_922_KEY, PROXY_922_USERNAME, PROXY_922_COUNTRY, PROXY_922_CITY, PROXY_922_HOSTNAME');
            return null;
        }
        return new ProxyService({
            token,
            key,
            username,
            country,
            city,
            hostname
        });
    }
    /**
   * 解析代理字符串
   * 格式：host:port:username:password
   */ parseProxyString(proxyString) {
        const parts = proxyString.split(':');
        if (parts.length !== 4) {
            throw new Error(`无效的代理格式: ${proxyString}，期望格式: host:port:username:password`);
        }
        const [host, port, username, password] = parts;
        return {
            server: `http://${host}:${port}`,
            username,
            password
        };
    }
    /**
   * 获取一条代理
   */ async getProxy() {
        const requestBody = {
            username: this.config.username,
            country: this.config.country,
            city: this.config.city,
            count: '1',
            hostname: this.config.hostname,
            format: '1'
        };
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(MODULE_NAME, `正在从 922proxy 获取代理 (国家: ${this.config.country}, 城市: ${this.config.city}, 主机名: ${this.config.hostname})...`);
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].debug(MODULE_NAME, `请求参数: ${JSON.stringify(requestBody, null, 2)}`);
            // 注意：根据 922proxy 文档，token 和 key 应该在 Header 中
            // 但某些 API 可能需要不同的格式，这里先尝试标准格式
            const response = await fetch(this.config.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    token: this.config.token,
                    key: this.config.key
                },
                body: JSON.stringify(requestBody)
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].debug(MODULE_NAME, `API 响应状态: ${response.status} ${response.statusText}`);
            if (!response.ok) {
                const errorText = await response.text();
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error(MODULE_NAME, `API 请求失败: ${response.status} ${response.statusText}`, new Error(errorText));
                throw new Error(`922proxy API 请求失败: ${response.status} ${response.statusText}, ${errorText}`);
            }
            const result = await response.json();
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].debug(MODULE_NAME, `API 响应数据: ${JSON.stringify(result, null, 2)}`);
            if (result.code !== 'success') {
                const errorMsg = `922proxy API 返回错误: ${result.msg || '未知错误'}`;
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error(MODULE_NAME, errorMsg);
                throw new Error(errorMsg);
            }
            if (!result.data || !Array.isArray(result.data) || result.data.length === 0) {
                const errorMsg = '922proxy API 返回空数据';
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error(MODULE_NAME, errorMsg);
                throw new Error(errorMsg);
            }
            // 获取第一条代理
            const proxyString = result.data[0];
            const parsed = this.parseProxyString(proxyString);
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(MODULE_NAME, `成功获取代理: ${parsed.server}`);
            return {
                proxyString,
                parsed
            };
        } catch (error) {
            // 如果是网络错误或其他错误，记录详细信息
            if (error instanceof TypeError && error.message.includes('fetch')) {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error(MODULE_NAME, '网络请求失败，请检查网络连接或 API URL', error);
            } else if (error instanceof Error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error(MODULE_NAME, '获取代理失败', error);
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error(MODULE_NAME, '获取代理失败', new Error(String(error)));
            }
            throw error;
        }
    }
}
}),
"[project]/src/lib/browser-manager.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

/**
 * 浏览器管理器
 * 负责管理浏览器实例和锁机制
 */ __turbopack_context__.s([
    "browserManager",
    ()=>browserManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$database$2f$database$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/database/database-adapter.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/logger.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$proxy$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/proxy-service.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
const MODULE_NAME = 'BrowserManager';
class BrowserManager {
    static instance;
    currentSession = null;
    lock = false;
    db;
    // 待访问的目标网址（用于限制多人使用：后到达的请求会覆盖先到达的请求）
    pendingUrl = null;
    // 待设置的 Referer（用于限制多人使用）
    pendingReferer = undefined;
    // 待使用的语言轮询列表（用于限制多人使用）
    pendingLanguageRotation = undefined;
    constructor(){
        this.db = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$database$2f$database$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DatabaseAdapter"]();
    }
    static getInstance() {
        if (!BrowserManager.instance) {
            BrowserManager.instance = new BrowserManager();
        }
        return BrowserManager.instance;
    }
    /**
   * 尝试获取锁
   * @returns 是否成功获取锁
   */ tryLock() {
        if (this.lock) {
            return false;
        }
        this.lock = true;
        return true;
    }
    /**
   * 尝试获取锁（公共方法，供 API 使用）
   * @returns 是否成功获取锁
   */ tryAcquireLock() {
        return this.tryLock();
    }
    /**
   * 释放锁
   */ releaseLock() {
        this.lock = false;
    }
    /**
   * 释放锁（公共方法，供 API 使用）
   */ releaseLockPublic() {
        this.releaseLock();
    }
    /**
   * 检查是否有正在运行的浏览器
   */ hasActiveSession() {
        return this.lock && this.currentSession !== null;
    }
    /**
   * 设置待访问的目标网址（用于限制多人使用）
   * 后到达的请求会覆盖先到达的请求的目标网址
   * @param url 目标网址
   * @param referer Referer 头（可选）
   * @param languageRotation 语言轮询列表（可选）
   */ setPendingRequest(url, referer, languageRotation) {
        this.pendingUrl = url;
        this.pendingReferer = referer;
        this.pendingLanguageRotation = languageRotation;
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(MODULE_NAME, `已更新待访问网址: ${url}${referer ? `, Referer: ${referer}` : ''}`);
    }
    /**
   * 获取并清除待访问的目标网址
   * @returns 待访问的目标网址和相关信息
   */ getAndClearPendingRequest() {
        if (!this.pendingUrl) {
            return null;
        }
        const result = {
            url: this.pendingUrl,
            referer: this.pendingReferer,
            languageRotation: this.pendingLanguageRotation
        };
        // 清除待访问信息
        this.pendingUrl = null;
        this.pendingReferer = undefined;
        this.pendingLanguageRotation = undefined;
        return result;
    }
    /**
   * 获取当前会话信息
   */ getCurrentSession() {
        return this.currentSession;
    }
    /**
   * 从数据库随机选择一个 iOS 设备
   */ async getRandomDevice() {
        const devices = await this.db.getDevicesByPlatform('ios');
        if (devices.length === 0) {
            throw new Error('数据库中没有可用的 iOS 设备');
        }
        const randomIndex = Math.floor(Math.random() * devices.length);
        const device = devices[randomIndex];
        return {
            id: String(device.id),
            name: device.name
        };
    }
    /**
   * 从语言列表中随机选择语言
   */ getRandomLanguage(languages) {
        if (languages.length === 0) {
            return 'en-US';
        }
        const randomIndex = Math.floor(Math.random() * languages.length);
        return languages[randomIndex];
    }
    /**
   * 启动浏览器并访问指定网址
   * 注意：实际访问的网址是从 pendingUrl 读取的（用于限制多人使用）
   * @param url 目标网址（已废弃，保留用于兼容性，实际使用 pendingUrl）
   * @param referer Referer 头（已废弃，保留用于兼容性，实际使用 pendingReferer）
   * @param languageRotation 语言轮询列表（已废弃，保留用于兼容性，实际使用 pendingLanguageRotation）
   */ async startBrowser(url, referer, languageRotation) {
        // 检查锁（如果锁已经被获取，这里会失败，但 API 已经处理了这种情况）
        // 如果 API 已经获取了锁，这里再次尝试获取会失败，但这是预期的
        // 实际上，如果 API 已经获取了锁，这里应该跳过检查
        // 但为了保持代码的健壮性，我们仍然检查
        if (!this.lock) {
            // 如果锁没有被获取，尝试获取
            if (!this.tryLock()) {
                throw new Error('上一次请求正在处理中，请稍后再试');
            }
        }
        // 如果锁已经被获取（由 API 获取），继续执行
        try {
            // 🐌 负优化：启动前随机延迟（模拟设备初始化时间，可以注释掉以提高响应速度）
            // 延迟放在获取锁之后，确保锁已获取
            const randomDelay = Math.floor(Math.random() * (25000 - 15000 + 1)) + 5000; // 15-25秒随机延迟
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(MODULE_NAME, `设备初始化中，预计等待 ${Math.round(randomDelay / 1000)} 秒...`);
            await new Promise((resolve)=>setTimeout(resolve, randomDelay));
            // 延迟结束后，获取最新的待访问网址（用于限制多人使用：后到达的请求会覆盖先到达的请求）
            const pendingRequest = this.getAndClearPendingRequest();
            if (!pendingRequest) {
                throw new Error('没有待访问的目标网址');
            }
            const actualUrl = pendingRequest.url;
            const actualReferer = pendingRequest.referer;
            const actualLanguageRotation = pendingRequest.languageRotation;
            // 获取代理配置
            // 优先使用固定代理，如果未设置则从 922proxy API 获取
            let proxyString;
            // 检查是否配置了固定代理
            const { FIXED_PROXY } = await __turbopack_context__.A("[project]/src/config/proxy-config.ts [app-route] (ecmascript, async loader)");
            if (FIXED_PROXY) {
                proxyString = FIXED_PROXY;
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(MODULE_NAME, `使用固定代理: ${FIXED_PROXY.split(':')[0]}:${FIXED_PROXY.split(':')[1]}`);
            } else {
                // 从 922proxy 获取代理（日本+随机城市）
                // 如果获取失败，直接终止任务，不启动浏览器
                const proxyService = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$proxy$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ProxyService"].createDefault();
                if (!proxyService) {
                    const errorMsg = '未配置固定代理，且 922proxy 配置未设置。请在 src/config/proxy-config.ts 中配置 FIXED_PROXY 或 token、key 和 username';
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error(MODULE_NAME, errorMsg);
                    throw new Error(errorMsg);
                }
                try {
                    const proxyConfig = await proxyService.getProxy();
                    proxyString = proxyConfig.proxyString;
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(MODULE_NAME, `已从 API 获取代理: ${proxyConfig.parsed.server}`);
                } catch (error) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error(MODULE_NAME, '获取代理失败，终止任务', error);
                    throw new Error(`获取代理失败: ${error instanceof Error ? error.message : String(error)}`);
                }
            }
            if (!proxyString) {
                const errorMsg = '无法获取代理配置';
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error(MODULE_NAME, errorMsg);
                throw new Error(errorMsg);
            }
            // 随机选择设备
            const { id: deviceId, name: deviceName } = await this.getRandomDevice();
            // 准备语言轮询列表（使用最新的待访问请求中的语言轮询列表）
            const languages = actualLanguageRotation || languageRotation || [
                'ja',
                'ja-JP'
            ];
            const selectedLanguage = this.getRandomLanguage(languages);
            // 配置浏览器选项
            const browserOptions = {
                headless: true,
                launchOptions: {
                    headless: true
                },
                languageRotation: languages,
                proxy: proxyString
            };
            // 创建浏览器
            const { browser, page } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createMobileBrowser"])(deviceId, browserOptions);
            // 设置 Referer（如果提供，优先使用最新的待访问请求中的 Referer）
            const finalReferer = actualReferer || referer;
            if (finalReferer && finalReferer.trim() !== '') {
                await page.setExtraHTTPHeaders({
                    Referer: finalReferer
                });
            }
            // 应用增强的反检测脚本（针对 Cloudflare）
            await page.addInitScript(()=>{
                // 1. 移除 webdriver 标识
                Object.defineProperty(navigator, 'webdriver', {
                    get: ()=>undefined
                });
                // 2. 覆盖 Chrome 自动化标识
                if (window.chrome) {
                    Object.defineProperty(window, 'chrome', {
                        get: ()=>({
                                runtime: {}
                            })
                    });
                }
                // 3. 覆盖 permissions API
                const originalQuery = window.navigator.permissions.query;
                window.navigator.permissions.query = (parameters)=>parameters.name === 'notifications' ? Promise.resolve({
                        state: Notification.permission
                    }) : originalQuery(parameters);
                // 4. 覆盖 plugins（避免空数组被检测）
                if (navigator.plugins.length === 0) {
                    Object.defineProperty(navigator, 'plugins', {
                        get: ()=>{
                            const plugins = [];
                            for(let i = 0; i < 3; i++){
                                plugins.push({
                                    name: `Plugin ${i}`,
                                    description: 'Plugin description',
                                    filename: 'plugin.dll'
                                });
                            }
                            return plugins;
                        }
                    });
                }
                // 5. 覆盖 languages（使用真实值，已在指纹注入中设置）
                // 这里不再覆盖，使用指纹注入中的值
                // 6. 移除自动化相关的属性
                delete window.navigator.__proto__.webdriver;
                // 7. 覆盖 iframe 检测
                const originalToString = Function.prototype.toString;
                Function.prototype.toString = function() {
                    if (this === navigator.getBattery) {
                        return 'function getBattery() { [native code] }';
                    }
                    return originalToString.call(this);
                };
                // 8. 覆盖 toString 方法，隐藏函数修改痕迹
                const getParameter = WebGLRenderingContext.prototype.getParameter;
                WebGLRenderingContext.prototype.getParameter = function(parameter) {
                    if (parameter === 37445) {
                        return 'Intel Inc.';
                    }
                    if (parameter === 37446) {
                        return 'Intel Iris OpenGL Engine';
                    }
                    return getParameter.call(this, parameter);
                };
                // 9. 覆盖 console.debug，避免检测脚本发现调试信息
                const originalDebug = console.debug;
                console.debug = ()=>{};
                // 10. 模拟真实的鼠标和键盘事件
                const originalAddEventListener = EventTarget.prototype.addEventListener;
                EventTarget.prototype.addEventListener = function(type, listener, options) {
                    // 如果是检测相关的事件，延迟触发
                    if (type === 'mousemove' || type === 'keydown') {
                        setTimeout(()=>{
                            originalAddEventListener.call(this, type, listener, options);
                        }, Math.random() * 100);
                        return;
                    }
                    return originalAddEventListener.call(this, type, listener, options);
                };
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(MODULE_NAME, '已应用增强的反检测脚本（针对 Cloudflare）');
            // 保存会话信息
            this.currentSession = {
                browser,
                page,
                deviceId,
                deviceName,
                startedAt: new Date()
            };
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(MODULE_NAME, `浏览器已启动: 设备=${deviceName}, 语言=${selectedLanguage}, URL=${actualUrl}${finalReferer ? `, Referer=${finalReferer}` : ''}`);
            // 监听页面事件以获取更多信息
            const pageEvents = {
                loaded: false,
                responseReceived: false,
                errors: [],
                warnings: [],
                networkRequests: []
            };
            // 监听控制台消息
            page.on('console', (msg)=>{
                const text = msg.text();
                if (msg.type() === 'error') {
                    pageEvents.errors.push(text);
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].warn(MODULE_NAME, `页面控制台错误: ${text}`);
                } else if (msg.type() === 'warning') {
                    pageEvents.warnings.push(text);
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].debug(MODULE_NAME, `页面控制台警告: ${text}`);
                }
            });
            // 监听页面响应
            page.on('response', (response)=>{
                const url = response.url();
                const status = response.status();
                const method = response.request().method();
                pageEvents.responseReceived = true;
                pageEvents.responseStatus = status;
                pageEvents.networkRequests.push({
                    url,
                    method,
                    status
                });
                // 记录主请求的响应
                if (url === actualUrl || url.includes(new URL(actualUrl).hostname)) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(MODULE_NAME, `收到页面响应: ${method} ${url} -> ${status}`);
                }
            });
            // 监听页面请求
            page.on('request', (request)=>{
                const url = request.url();
                const method = request.method();
                pageEvents.networkRequests.push({
                    url,
                    method
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].debug(MODULE_NAME, `页面请求: ${method} ${url}`);
            });
            // 监听页面加载完成
            page.on('load', ()=>{
                pageEvents.loaded = true;
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(MODULE_NAME, '页面 load 事件触发');
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(MODULE_NAME, '开始加载页面，15秒后自动关闭浏览器...');
            const startTime = Date.now();
            // 开始加载页面（不等待加载完成，使用最新的待访问请求中的网址）
            const gotoPromise = page.goto(actualUrl, {
                waitUntil: 'domcontentloaded',
                timeout: 30000
            }).then(async (response)=>{
                const loadTime = Date.now() - startTime;
                const finalUrl = page.url();
                const pageTitle = await page.title().catch(()=>'无法获取标题');
                pageEvents.finalUrl = finalUrl;
                pageEvents.pageTitle = pageTitle;
                pageEvents.loaded = true;
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(MODULE_NAME, `页面加载成功: 状态码=${response?.status() || 'N/A'}, 耗时=${loadTime}ms, 最终URL=${finalUrl}, 标题=${pageTitle}`);
                // 检查是否被重定向
                if (finalUrl !== actualUrl) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(MODULE_NAME, `页面发生重定向: ${actualUrl} -> ${finalUrl}`);
                }
                return response;
            }).catch(async (error)=>{
                const loadTime = Date.now() - startTime;
                let finalUrl;
                let pageTitle;
                try {
                    finalUrl = page.url();
                    pageTitle = await page.title();
                } catch (e) {
                    finalUrl = '无法获取URL';
                    pageTitle = '无法获取标题';
                }
                pageEvents.finalUrl = finalUrl;
                pageEvents.pageTitle = pageTitle;
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error(MODULE_NAME, `页面加载失败: 耗时=${loadTime}ms, 最终URL=${finalUrl}, 标题=${pageTitle}`, error);
                // 记录详细的错误信息
                if (error.message) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error(MODULE_NAME, `错误详情: ${error.message}`);
                }
                // 即使页面加载失败，也继续执行关闭逻辑（不抛出错误）
                return null;
            });
            // 等待 Cloudflare 挑战完成（如果存在）
            // 检查页面是否包含 Cloudflare 挑战
            const checkCloudflareChallenge = async ()=>{
                try {
                    // 等待页面加载
                    await page.waitForLoadState('domcontentloaded', {
                        timeout: 5000
                    }).catch(()=>{});
                    // 检查是否是 Cloudflare 挑战页面
                    const isChallenge = await page.evaluate(()=>{
                        const bodyText = document.body?.innerText || '';
                        const title = document.title || '';
                        return bodyText.includes('Checking your browser') || bodyText.includes('Just a moment') || bodyText.includes('DDoS protection by Cloudflare') || title.includes('Just a moment') || document.querySelector('#challenge-form') !== null || document.querySelector('.cf-browser-verification') !== null;
                    }).catch(()=>false);
                    if (isChallenge) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(MODULE_NAME, '检测到 Cloudflare 挑战，等待完成...');
                        // 等待挑战完成（最多等待 15 秒）
                        await page.waitForFunction(()=>{
                            const bodyText = document.body?.innerText || '';
                            return !(bodyText.includes('Checking your browser') || bodyText.includes('Just a moment') || bodyText.includes('DDoS protection by Cloudflare'));
                        }, {
                            timeout: 15000
                        }).catch(()=>{
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].warn(MODULE_NAME, 'Cloudflare 挑战等待超时，继续执行...');
                        });
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(MODULE_NAME, 'Cloudflare 挑战已完成或超时');
                    }
                } catch (error) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].debug(MODULE_NAME, '检查 Cloudflare 挑战时出错', error);
                }
            };
            // 在页面加载后检查 Cloudflare 挑战
            gotoPromise.then(()=>{
                checkCloudflareChallenge();
            }).catch(()=>{
                // 即使加载失败也尝试检查
                checkCloudflareChallenge();
            });
            // 从开始加载算起，15秒后自动关闭浏览器
            setTimeout(async ()=>{
                try {
                    const elapsedTime = Date.now() - startTime;
                    // 汇总页面加载信息
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(MODULE_NAME, '='.repeat(60));
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(MODULE_NAME, '页面访问摘要:');
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(MODULE_NAME, `  目标URL: ${actualUrl}`);
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(MODULE_NAME, `  最终URL: ${pageEvents.finalUrl || '未获取到'}`);
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(MODULE_NAME, `  页面标题: ${pageEvents.pageTitle || '未获取到'}`);
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(MODULE_NAME, `  是否收到响应: ${pageEvents.responseReceived ? '是' : '否'}`);
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(MODULE_NAME, `  响应状态码: ${pageEvents.responseStatus || 'N/A'}`);
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(MODULE_NAME, `  是否触发load事件: ${pageEvents.loaded ? '是' : '否'}`);
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(MODULE_NAME, `  网络请求数: ${pageEvents.networkRequests.length}`);
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(MODULE_NAME, `  控制台错误数: ${pageEvents.errors.length}`);
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(MODULE_NAME, `  控制台警告数: ${pageEvents.warnings.length}`);
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(MODULE_NAME, `  总耗时: ${elapsedTime}ms`);
                    // 记录前几个网络请求（最多5个）
                    if (pageEvents.networkRequests.length > 0) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(MODULE_NAME, '  主要网络请求:');
                        pageEvents.networkRequests.slice(0, 5).forEach((req, index)=>{
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(MODULE_NAME, `    ${index + 1}. ${req.method} ${req.url} ${req.status ? `-> ${req.status}` : ''}`);
                        });
                    }
                    // 记录控制台错误（如果有）
                    if (pageEvents.errors.length > 0) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].warn(MODULE_NAME, '  控制台错误:');
                        pageEvents.errors.slice(0, 3).forEach((err, index)=>{
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].warn(MODULE_NAME, `    ${index + 1}. ${err}`);
                        });
                    }
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(MODULE_NAME, '='.repeat(60));
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(MODULE_NAME, '15秒时间到，自动关闭浏览器...');
                    await this.closeBrowser();
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info(MODULE_NAME, '浏览器已关闭');
                } catch (error) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error(MODULE_NAME, '自动关闭浏览器时出错', error);
                    // 确保释放锁
                    this.releaseLock();
                }
            }, 15000); // 修复：改为 5000 毫秒（5秒）
            // 等待页面加载完成（但不影响关闭逻辑）
            await gotoPromise;
        } catch (error) {
            // 如果出错，释放锁
            this.releaseLock();
            throw error;
        }
    }
    /**
   * 关闭当前浏览器会话
   */ async closeBrowser() {
        if (this.currentSession) {
            try {
                await this.currentSession.browser.close();
            } catch (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error(MODULE_NAME, '关闭浏览器时出错', error);
            }
            this.currentSession = null;
        }
        this.releaseLock();
    }
    /**
   * 获取浏览器状态
   */ getStatus() {
        if (this.currentSession) {
            return {
                isRunning: true,
                deviceName: this.currentSession.deviceName,
                startedAt: this.currentSession.startedAt
            };
        }
        return {
            isRunning: false
        };
    }
}
const browserManager = BrowserManager.getInstance();
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/app/api/browser/start/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

/**
 * 启动浏览器 API
 * POST /api/browser/start
 */ __turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$browser$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/browser-manager.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/logger.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$browser$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$browser$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const MODULE_NAME = 'API:Start';
async function POST(request) {
    try {
        // 解析请求体
        const body = await request.json();
        const { url, referer, languageRotation } = body;
        // 验证参数
        if (!url) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: '缺少必需参数: url'
            }, {
                status: 400
            });
        }
        // 验证 URL 格式
        try {
            new URL(url);
        } catch  {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: '无效的 URL 格式'
            }, {
                status: 400
            });
        }
        // 先检查锁（同步检查），获取不到锁直接返回错误
        // 必须在验证参数之后检查，避免无效请求占用锁检查资源
        if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$browser$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["browserManager"].hasActiveSession()) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: '上一次请求正在处理中，请稍后再试'
            }, {
                status: 429
            });
        }
        // 无论是否能获取到锁，都先保存目标网址（用于限制多人使用：后到达的请求会覆盖先到达的请求）
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$browser$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["browserManager"].setPendingRequest(url, referer, languageRotation);
        // 尝试获取锁（同步操作）
        // 如果获取不到锁，直接返回错误，不启动浏览器
        // 但目标网址已经保存，如果当前正在处理的请求延迟结束后，会使用最新的网址
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$browser$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["browserManager"].tryAcquireLock()) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: '上一次请求正在处理中，请稍后再试'
            }, {
                status: 429
            });
        }
        // 已经获取到锁，异步启动浏览器（延迟在 startBrowser 内部）
        // startBrowser 内部会检测到锁已被获取并继续执行
        // 注意：startBrowser 会在延迟结束后读取最新的 pendingUrl，而不是使用传入的参数
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$browser$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["browserManager"].startBrowser().catch((error)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error(MODULE_NAME, '启动浏览器失败', error);
            // 如果启动失败，释放锁
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$browser$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["browserManager"].releaseLockPublic();
        });
        // 立即返回成功响应
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: '浏览器启动请求已提交，正在后台处理'
        });
    } catch (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error(MODULE_NAME, 'API 处理错误', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: '服务器内部错误'
        }, {
            status: 500
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6f802681._.js.map