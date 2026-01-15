-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_devices" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "group" TEXT NOT NULL DEFAULT 'default',
    "cpuCores" INTEGER NOT NULL,
    "memory" INTEGER,
    "screenWidth" INTEGER NOT NULL,
    "screenHeight" INTEGER NOT NULL,
    "devicePixelRatio" REAL NOT NULL,
    "colorDepth" INTEGER NOT NULL,
    "osVersion" TEXT NOT NULL,
    "system_platform" TEXT NOT NULL,
    "user_agent" TEXT NOT NULL,
    "browser_version" TEXT NOT NULL,
    "browser_name" TEXT NOT NULL,
    "browser_vendor" TEXT NOT NULL,
    "user_agent_data" TEXT,
    "device_memory" INTEGER,
    "hardware_concurrency" INTEGER NOT NULL,
    "max_touch_points" INTEGER NOT NULL,
    "webgl_renderer" TEXT,
    "webgl_vendor" TEXT,
    "canvas_noise" REAL,
    "audio_context_seed" REAL,
    "connection_type" TEXT,
    "effective_type" TEXT,
    "downlink" INTEGER,
    "rtt" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_devices" ("audio_context_seed", "browser_name", "browser_vendor", "browser_version", "canvas_noise", "colorDepth", "connection_type", "cpuCores", "created_at", "devicePixelRatio", "device_memory", "downlink", "effective_type", "hardware_concurrency", "id", "max_touch_points", "memory", "name", "osVersion", "platform", "rtt", "screenHeight", "screenWidth", "system_platform", "updated_at", "user_agent", "user_agent_data", "webgl_renderer", "webgl_vendor") SELECT "audio_context_seed", "browser_name", "browser_vendor", "browser_version", "canvas_noise", "colorDepth", "connection_type", "cpuCores", "created_at", "devicePixelRatio", "device_memory", "downlink", "effective_type", "hardware_concurrency", "id", "max_touch_points", "memory", "name", "osVersion", "platform", "rtt", "screenHeight", "screenWidth", "system_platform", "updated_at", "user_agent", "user_agent_data", "webgl_renderer", "webgl_vendor" FROM "devices";
DROP TABLE "devices";
ALTER TABLE "new_devices" RENAME TO "devices";
CREATE INDEX "devices_platform_idx" ON "devices"("platform");
CREATE INDEX "devices_name_idx" ON "devices"("name");
CREATE INDEX "devices_group_idx" ON "devices"("group");
CREATE UNIQUE INDEX "devices_name_platform_group_key" ON "devices"("name", "platform", "group");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
