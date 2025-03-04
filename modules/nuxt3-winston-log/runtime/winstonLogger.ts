/**
 * 2. 配置并创建 Winston 日志系统实例
 * 支持日志文件的自动轮转（按日期切割）
 * 分别处理 info 和 error 级别的日志
 * 提供自定义的日志格式化功能
 * 支持日志文件的压缩归档
 */
// 导入 Node.js 的路径处理模块
import path from 'path'
// 导入 winston 日志库
import * as winston from 'winston'
// 导入 winston 日志轮转插件，用于按日期切割日志文件
import DailyRotateFile from 'winston-daily-rotate-file'

// 从 winston 中解构需要的工具函数
const { createLogger, format } = winston

// 定义日志配置选项接口
interface LoggerOptions {
  maxSize: string // 单个日志文件的最大大小
  maxFiles: string // 保留的日志文件数量或时间
  infoLogPath: string // info 级别日志存放路径
  infoLogName: string // info 级别日志文件名
  errorLogPath: string // error 级别日志存放路径
  errorLogName: string // error 级别日志文件名
}

/** 导出获取日志实例的函数 */
export const getLogger = (options: LoggerOptions) => {
  // 自定义日志格式
  const customFormat = format.combine(
    // 添加时间戳，格式：YYYY-MM-DD HH:mm:ss
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    // 对齐日志输出
    format.align(),
    // 自定义输出格式：级别: [时间戳]: 消息
    format.printf(i => `${i.level}: ${[i.timestamp]}: ${i.message}`),
  )

  // 从配置中获取相关参数
  const maxSize = options.maxSize
  const maxFiles = options.maxFiles
  // 构建完整的日志文件路径
  const fullInfoPath = path.join(options.infoLogPath, options.infoLogName)
  const fullerrorPath = path.join(options.errorLogPath, options.errorLogName)

  // 调试日志（已注释）
  // console.log(`maxSize=${maxSize}`);
  // console.log(`maxFiles=${maxFiles}`);
  // console.log(`fullInfoPath=${fullInfoPath}`);
  // console.log(`fullerrorPath=${fullerrorPath}`);

  // 日志轮转的默认配置
  const defaultOptions = {
    format: customFormat,
    datePattern: 'YYYY-MM-DD', // 日期格式
    zippedArchive: true, // 是否压缩归档
    maxSize, // 单个文件最大大小
    maxFiles, // 保留的文件数量/时间
  }

  // 创建全局日志实例
  const globalLogger = createLogger({
    format: customFormat,
    transports: [
      // 配置 info 级别日志传输
      new DailyRotateFile({
        filename: fullInfoPath,
        level: 'info',
        ...defaultOptions,
      }),
      // 配置 error 级别日志传输
      new DailyRotateFile({
        filename: fullerrorPath,
        level: 'error',
        ...defaultOptions,
      }),
    ],
  })

  return globalLogger
}
