/**
 * @name channel 校验
 * @description 校验 channel 是否为 channel1 ~ channel99
 */
export default defineNuxtRouteMiddleware((to) => {
  const channel = to.params.channel as string
  // 校验 channel 是否为 channel1 ~ channel99
  const isValid = /^channel([1-9][0-9]?)$/.test(channel)
  if (channel && !isValid) {
    return navigateTo('/404')
  }
})
