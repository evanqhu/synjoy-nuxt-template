/**
 * 这里的变量不会被环境变量覆盖
 * 使用 useAppConfig() 获取配置
 * 在构建时确定的公共令牌，网站配置（如主题变体、标题）以及任何不敏感的项目配置
 */
export default defineAppConfig({
  title: 'My App',
})
