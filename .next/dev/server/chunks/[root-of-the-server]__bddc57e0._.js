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
;
;
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
                console.log('[DatabaseAdapter] Parsed userAgentData:', JSON.stringify(userAgentData, null, 2));
            } catch (error) {
                console.warn('[DatabaseAdapter] Failed to parse userAgentData:', error);
            }
        } else {
            console.log('[DatabaseAdapter] No userAgentData in database record');
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
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$playwright__$5b$external$5d$__$28$playwright$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$playwright__$5b$external$5d$__$28$playwright$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
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
   * 启动浏览器
   */ async launchBrowser(platform, options) {
        const browserType = this.getBrowserType(platform);
        return await browserType.launch(options);
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
      // 添加微小的噪声以保持一致性
      const noise = ${fingerprint.canvasNoise || 0};
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
      const noise = ${fingerprint.canvasNoise || 0};
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
      const seed = ${fingerprint.audioContextSeed || 0};
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
      // 添加微小的噪声以保持一致性
      const noise = ${fingerprint.canvasNoise || 0};
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
      const noise = ${fingerprint.canvasNoise || 0};
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
      const seed = ${fingerprint.audioContextSeed || 0};
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
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
class BrowserManager {
    static instance;
    currentSession = null;
    lock = false;
    db;
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
   * 获取当前会话信息
   */ getCurrentSession() {
        return this.currentSession;
    }
    /**
   * 从数据库随机选择一个设备
   */ async getRandomDevice() {
        const devices = await this.db.getAllDevices();
        if (devices.length === 0) {
            throw new Error('数据库中没有可用设备');
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
   * @param url 目标网址
   * @param referer Referer 头
   * @param languageRotation 语言轮询列表（可选）
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
            const randomDelay = Math.floor(Math.random() * (60000 - 15000 + 1)) + 15000; // 15-60秒随机延迟
            console.log(`设备初始化中，预计等待 ${Math.round(randomDelay / 1000)} 秒...`);
            await new Promise((resolve)=>setTimeout(resolve, randomDelay));
            // 随机选择设备
            const { id: deviceId, name: deviceName } = await this.getRandomDevice();
            // 准备语言轮询列表
            const languages = languageRotation || [
                'ja',
                'ja-JP'
            ];
            const selectedLanguage = this.getRandomLanguage(languages);
            // 配置浏览器选项
            const browserOptions = {
                headless: false,
                launchOptions: {
                    headless: false
                },
                languageRotation: languages
            };
            // 创建浏览器
            const { browser, page } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createMobileBrowser"])(deviceId, browserOptions);
            // 设置 Referer
            await page.setExtraHTTPHeaders({
                Referer: referer
            });
            // 访问目标网址
            await page.goto(url, {
                waitUntil: 'networkidle',
                timeout: 30000
            });
            // 保存会话信息
            this.currentSession = {
                browser,
                page,
                deviceId,
                deviceName,
                startedAt: new Date()
            };
            console.log(`浏览器已启动: 设备=${deviceName}, 语言=${selectedLanguage}, URL=${url}`);
            console.log('页面加载完成，5秒后自动关闭浏览器...');
            // 等待5秒后自动关闭浏览器
            setTimeout(async ()=>{
                try {
                    console.log('自动关闭浏览器...');
                    await this.closeBrowser();
                    console.log('浏览器已关闭');
                } catch (error) {
                    console.error('自动关闭浏览器时出错:', error);
                    // 确保释放锁
                    this.releaseLock();
                }
            }, 5000);
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
                console.error('关闭浏览器时出错:', error);
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
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$browser$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$browser$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
async function POST(request) {
    try {
        // 解析请求体
        const body = await request.json();
        const { url, referer, languageRotation } = body;
        // 验证参数
        if (!url || !referer) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: '缺少必需参数: url 和 referer'
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
        // 尝试获取锁（同步操作）
        // 如果获取不到锁，直接返回错误，不启动浏览器
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$browser$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["browserManager"].tryAcquireLock()) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: '上一次请求正在处理中，请稍后再试'
            }, {
                status: 429
            });
        }
        // 已经获取到锁，异步启动浏览器（延迟在 startBrowser 内部）
        // startBrowser 内部会检测到锁已被获取并继续执行
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$browser$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["browserManager"].startBrowser(url, referer, languageRotation).catch((error)=>{
            console.error('启动浏览器失败:', error);
            // 如果启动失败，释放锁
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$browser$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["browserManager"].releaseLockPublic();
        });
        // 立即返回成功响应
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: '浏览器启动请求已提交，正在后台处理'
        });
    } catch (error) {
        console.error('API 错误:', error);
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

//# sourceMappingURL=%5Broot-of-the-server%5D__bddc57e0._.js.map