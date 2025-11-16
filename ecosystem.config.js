1/**
 * PM2 配置文件
 * 用于生产环境部署
 */

const path = require('path');

module.exports = {
  apps: [
    {
      name: 'fuck-sdun',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      cwd: path.resolve(__dirname),
      instances: 1, // 单实例运行（Playwright 需要单实例）
      exec_mode: 'fork', // 使用 fork 模式（单实例）
      // 启动前执行的命令（仅在首次启动时执行）
      // 注意：PM2 的 pre_start 钩子不会自动执行，需要手动运行构建
      env: {
        NODE_ENV: 'production',
        PORT: 9292,
        LOG_LEVEL: 'info',
      },
      // 日志配置
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      // 自动重启配置
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      // 其他配置
      min_uptime: '10s',
      max_restarts: 10,
      restart_delay: 4000,
    },
  ],
};

