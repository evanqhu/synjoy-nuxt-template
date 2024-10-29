/**
 * 这里的变量不会被环境变量覆盖
 * 使用 useAppConfig() 获取配置
 * 在构建时确定的公共令牌，网站配置（如主题变体、标题）以及任何不敏感的项目配置
 */
export default defineAppConfig({
  title: 'My App',
  FB_API_KEY: 'AIzaSyBcS3cwlUXpK99s0FiNLcdhiTqTbqa8pRo',
  FB_AUTH_DOMAIN: 'webs-58a8d.firebaseapp.com',
  FB_PROJECT_ID: 'webs-58a8d',
  FB_STORAGE_BUCKET: 'webs-58a8d.appspot.com',
  FB_MESSAGING_SENDER_ID: '730684174767',
  FB_APP_ID: '1:730684174767:web:c2116944c8d15fb40c3f5a',
  FB_MEASUREMENT_ID: 'G-TYZVCBGETW',
})
