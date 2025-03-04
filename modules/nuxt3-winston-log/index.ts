/**
 * 1. 模块的主入口文件
 * 提供了一个 Winston 日志系统的 Nuxt3 模块
 * 允许配置日志文件的大小、保留时间、路径和文件名格式
 * 支持分别配置 info 和 error 级别的日志
 * 提供了请求中间件处理的选项
 * 包含了配置合并逻辑，确保在用户配置无效时使用默认值
 */
// 导入 Nuxt 模块开发所需的工具函数
import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

/** 判断参数是否有效 */
function judgeIfStatus(params: any) {
  if (!params) {
    return false
  }
  if (params === 'null') {
    return false
  }
  if (params === 'undefined') {
    return false
  }
  if (typeof params === 'string') {
    if (params.replace(/(^s*)|(s*$)/g, '').length === 0) {
      return false
    }
  }
  return true
}

// 模块配置选项的类型定义接口
// export interface ModuleOptions {}

// 定义并导出 Nuxt 模块
export default defineNuxtModule({
  // 模块元数据配置
  meta: {
    name: 'nuxt3WinstonLog', // 模块名称
    configKey: 'nuxt3WinstonLog', // 配置键名
  },
  // 模块默认配置选项
  defaults: {},
  // 模块设置函数
  setup(options: any, nuxt: any) {
    // 默认配置选项
    const defaultOptions = {
      maxSize: '1024m', // 日志文件最大大小
      maxFiles: '14d', // 日志文件保留天数
      infoLogPath: `./logs`, // info 级别日志路径
      infoLogName: `%DATE%-${process.env.NODE_ENV}-info.log`, // info 日志文件名格式
      errorLogPath: `./logs`, // error 级别日志路径
      errorLogName: `%DATE%-${process.env.NODE_ENV}-error.log`, // error 日志文件名格式
      skipRequestMiddlewareHandler: false, // 是否跳过请求中间件处理
    }

    // 合并用户配置和默认配置
    // 使用 judgeIfStatus 函数判断用户配置是否有效，无效则使用默认值
    const mergeOptions = {
      maxSize: judgeIfStatus(options?.maxSize)
        ? options.maxSize
        : defaultOptions.maxSize,
      maxFiles: judgeIfStatus(options?.maxFiles)
        ? options.maxFiles
        : defaultOptions.maxFiles,
      infoLogPath: judgeIfStatus(options?.infoLogPath)
        ? options.infoLogPath
        : defaultOptions.infoLogPath,
      infoLogName: judgeIfStatus(options?.infoLogName)
        ? options.infoLogName
        : defaultOptions.infoLogName,
      errorLogPath: judgeIfStatus(options?.errorLogPath)
        ? options.errorLogPath
        : defaultOptions.errorLogPath,
      errorLogName: judgeIfStatus(options?.errorLogName)
        ? options.errorLogName
        : defaultOptions.errorLogName,
      skipRequestMiddlewareHandler: judgeIfStatus(
        options?.skipRequestMiddlewareHandler,
      )
        ? options.skipRequestMiddlewareHandler
        : defaultOptions.skipRequestMiddlewareHandler,
    }

    // 将合并后的配置添加到 Nuxt 运行时配置中
    nuxt.options.runtimeConfig.public.nuxt3WinstonLog = mergeOptions

    // 创建模块解析器，用于解析模块相关文件路径
    const resolver = createResolver(import.meta.url)

    // 添加服务端插件
    addPlugin(resolver.resolve('./runtime/plugin.server'))

    // 如果不跳过请求中间件处理，则添加控制台路由插件
    if (mergeOptions.skipRequestMiddlewareHandler !== true) {
      nuxt.options.nitro.plugins = nuxt.options.nitro.plugins || []
      nuxt.options.nitro.plugins.push(
        resolver.resolve('./runtime/consoleRoute.server'),
      )
    }
  },
})
