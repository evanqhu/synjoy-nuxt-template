/**
 * 3. 重写 Node.js 的控制台日志方法，使其同时输出到 Winston 日志系统
 * 保持原有控制台输出的同时，将日志保存到文件中
 * 确保只初始化一次，避免重复重写控制台方法
 */
// 导入自定义的 Winston 日志工具
import { getLogger } from './winstonLogger'
// 导入 Nuxt 插件定义函数
import { defineNuxtPlugin } from '#app'

// 导出 Nuxt 插件
export default defineNuxtPlugin((nuxtApp) => {
  // 检查是否已经重建过控制台
  // 使用 global._isRebuildConsole 标志位避免重复初始化
  if (!(<any>global)._isRebuildConsole) {
    // 输出初始化信息
    console.log('📝  winstonLogger rebuild console')

    // 从 Nuxt 运行时配置中获取日志配置选项
    const options = nuxtApp.$config.public.nuxt3WinstonLog
    // 创建全局日志实例
    const globalLogger = getLogger(options)

    // 保存原始的 console.info 和 console.error 方法
    const originInfo = console.info
    const originError = console.error

    // 重写 console.info 方法
    console.info = function (...rest) {
      // 将所有参数转换为字符串并用空格连接
      const str = rest.join(' ')
      // 使用 Winston 记录 info 级别日志
      globalLogger.info(str)
      // 调用原始的 console.info 方法，保持原有的控制台输出
      originInfo.apply(this, rest)
    }

    // 重写 console.error 方法
    console.error = function (...rest) {
      // 将所有参数转换为字符串并用空格连接
      const str = rest.join(' ')
      // 同时记录 info 和 error 级别的日志
      globalLogger.info(str)
      globalLogger.error(str)
      // 调用原始的 console.error 方法，保持原有的控制台输出
      originError.apply(this, rest)
    }

    // 设置标志位，表示已完成控制台重建
    ;(<any>global)._isRebuildConsole = true
  }

  // 添加 app error 钩子
  nuxtApp.hook('app:error', (error) => {
    console.error('📝 App Error:', {
      error: error.message,
      stack: error.stack,
    })
  })

  nuxtApp.hook('vue:error', (error: any, instance, info) => {
    console.error('📝 Vue Error:', {
      error: error.message,
      component: instance?.$options.name || 'anonymous',
      info,
      stack: error.stack,
    })
  })
})
