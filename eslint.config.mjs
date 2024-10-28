// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@stylistic/quotes': 'warn', // 单引号
      '@stylistic/semi': 'warn', // 不添加尾随分号
      '@stylistic/comma-dangle': 'warn', // 添加尾随逗号
      'vue/html-quotes': 'warn', // Vue template 中用单引号
      '@stylistic/no-trailing-spaces': 'warn', // 删除尾随空格
    },
  },
)
