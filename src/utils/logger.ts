/**
 * 简单的日志工具
 * 统一日志格式，支持日志级别控制
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

class Logger {
  private level: LogLevel;
  private isDevelopment: boolean;

  constructor() {
    // 从环境变量读取日志级别，默认 info
    const envLevel = (process.env.LOG_LEVEL || 'info').toLowerCase() as LogLevel;
    this.level = ['debug', 'info', 'warn', 'error'].includes(envLevel) ? envLevel : 'info';
    this.isDevelopment = process.env.NODE_ENV !== 'production';
  }

  /**
   * 格式化日志消息
   */
  private format(level: LogLevel, module: string, message: string, ...args: any[]): string {
    const timestamp = new Date().toISOString();
    const levelUpper = level.toUpperCase().padEnd(5);
    const moduleName = module.padEnd(20);
    return `[${timestamp}] ${levelUpper} [${moduleName}] ${message}`;
  }

  /**
   * 检查是否应该输出该级别的日志
   */
  private shouldLog(level: LogLevel): boolean {
    const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
    return levels.indexOf(level) >= levels.indexOf(this.level);
  }

  /**
   * Debug 日志（开发环境）
   */
  debug(module: string, message: string, ...args: any[]): void {
    if (this.shouldLog('debug') && this.isDevelopment) {
      console.debug(this.format('debug', module, message), ...args);
    }
  }

  /**
   * Info 日志
   */
  info(module: string, message: string, ...args: any[]): void {
    if (this.shouldLog('info')) {
      console.log(this.format('info', module, message), ...args);
    }
  }

  /**
   * Warning 日志
   */
  warn(module: string, message: string, ...args: any[]): void {
    if (this.shouldLog('warn')) {
      console.warn(this.format('warn', module, message), ...args);
    }
  }

  /**
   * Error 日志
   */
  error(module: string, message: string, error?: Error | unknown, ...args: any[]): void {
    if (this.shouldLog('error')) {
      if (error instanceof Error) {
        console.error(
          this.format('error', module, message),
          ...args,
          '\n',
          error.stack || error.message
        );
      } else {
        console.error(this.format('error', module, message), error, ...args);
      }
    }
  }
}

// 导出单例
export const logger = new Logger();

// 导出类型
export type { LogLevel };

