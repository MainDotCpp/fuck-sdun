/*
  Warnings:

  - You are about to drop the `Device` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `browser_specs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fingerprint_specs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hardware_specs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `system_specs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Device";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "browser_specs";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "fingerprint_specs";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "hardware_specs";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "system_specs";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "devices" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
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

-- CreateIndex
CREATE INDEX "devices_platform_idx" ON "devices"("platform");

-- CreateIndex
CREATE INDEX "devices_name_idx" ON "devices"("name");

-- CreateIndex
CREATE UNIQUE INDEX "devices_name_platform_key" ON "devices"("name", "platform");
