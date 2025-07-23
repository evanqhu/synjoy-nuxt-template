export const useKwaiTrack = () => {
  const { webConfig } = useAppStore()
  // 如果是服务端，则不执行
  if (import.meta.server) {
    return () => {}
  }

  const kwaiTrack = (ads: string, event: string = 'completeRegistration') => {
    console.log('🚀🚀🚀 Kwai Track', ads)
    if (!window.kwaiq) {
      console.error('Kwai Track is not supported.')
      return () => {}
    }
    window.kwaiq.instance(webConfig.kwai).track(event)
  }

  return kwaiTrack
}
