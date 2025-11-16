-- CreateTable
CREATE TABLE "Device" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "hardware_specs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "deviceId" INTEGER NOT NULL,
    "cpuCores" INTEGER NOT NULL,
    "memory" INTEGER,
    "screenWidth" INTEGER NOT NULL,
    "screenHeight" INTEGER NOT NULL,
    "devicePixelRatio" REAL NOT NULL,
    "colorDepth" INTEGER NOT NULL,
    CONSTRAINT "hardware_specs_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "system_specs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "deviceId" INTEGER NOT NULL,
    "osVersion" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    CONSTRAINT "system_specs_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "browser_specs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "deviceId" INTEGER NOT NULL,
    "userAgent" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "vendor" TEXT NOT NULL,
    CONSTRAINT "browser_specs_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "fingerprint_specs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "deviceId" INTEGER NOT NULL,
    "deviceMemory" INTEGER,
    "hardwareConcurrency" INTEGER NOT NULL,
    "maxTouchPoints" INTEGER NOT NULL,
    "webglRenderer" TEXT,
    "webglVendor" TEXT,
    "canvasNoise" REAL,
    "audioContextSeed" REAL,
    "connectionType" TEXT,
    "effectiveType" TEXT,
    "downlink" INTEGER,
    "rtt" INTEGER,
    CONSTRAINT "fingerprint_specs_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Device_platform_idx" ON "Device"("platform");

-- CreateIndex
CREATE INDEX "Device_name_idx" ON "Device"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Device_name_platform_key" ON "Device"("name", "platform");

-- CreateIndex
CREATE UNIQUE INDEX "hardware_specs_deviceId_key" ON "hardware_specs"("deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "system_specs_deviceId_key" ON "system_specs"("deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "browser_specs_deviceId_key" ON "browser_specs"("deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "fingerprint_specs_deviceId_key" ON "fingerprint_specs"("deviceId");
