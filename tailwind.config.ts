import type { Config } from 'tailwindcss'

const config: Config = {
  // 定义需要扫描的文件
  content: [
    './app/layouts/**/*.{vue,js,ts,jsx,tsx}',
    './app/pages/**/*.{vue,js,ts,jsx,tsx}',
    './app/components/**/*.{vue,js,ts,jsx,tsx}',
  ],
  // 定义主题
  theme: {
    // 扩展默认配置
    extend: {
      // 定义间距变量
      spacing: {
        header: 'var(--header-height)',
      },
      // 定义宽度变量
      // width: {
      //   container: 'var(--container-width)',
      // },
      maxWidth: {
        container: 'var(--container-width)',
      },
      // 定义颜色变量
      colors: {
        primary: 'var(--theme-color)',
      },
    },
  },
}
export default config
