/**
 * https://nuxt.com/docs/guide/directory-structure/app-config
 * 这里的变量不会被环境变量覆盖，可以在生命周期的运行时内更新
 * 使用 useAppConfig() 获取配置
 * 使用 updateAppConfig() 更新配置
 * 在构建时确定的公共令牌，网站配置（如主题变体、标题）以及任何不敏感的项目配置
 * 这里的值会暴露给用户，所以不要包含敏感信息
 */
export default defineAppConfig({
  title: 'My App',
  // 主题色
  theme: {
    primaryColor: '#ababab',
  },
})
