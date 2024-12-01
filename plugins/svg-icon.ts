/**
 * Svg 雪碧图插件 vite-plugin-svg-icons
 * 用于全局提供组件 SvgIcon
 */
import 'virtual:svg-icons-register'
import SvgIcon from '~/components/SvgIcon.vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('svg-icon', SvgIcon)
})
