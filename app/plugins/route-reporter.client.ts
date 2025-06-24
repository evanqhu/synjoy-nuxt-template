export default defineNuxtPlugin((_nuxtApp) => {
  // 开发环境不上报
  if (process.env.NODE_ENV === 'development') return

  const router = useRouter()
  router.afterEach((to, from) => {
    reportPageView(to.fullPath, from.fullPath)
  })
})

async function reportPageView(_to: string, _from: string) {
  // 你自己的上报逻辑，比如 fetch 或 axios
  try {
    const res = await $fetch('/api/report', {
      method: 'get',
    })
    if (res?.success) {
      console.log('🚀🚀🚀 Report success')
    }
    else {
      console.error('🚀🚀🚀 Report failed:', res)
    }
  }
  catch (error) {
    console.error('Error reporting to /api/report:', error)
  }
}
