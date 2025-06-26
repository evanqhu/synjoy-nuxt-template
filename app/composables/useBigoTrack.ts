/**
 * @name Bigo Track
 * @description 使用 Bigo Track 跟踪广告曝光和点击
 */
export function useBigoTrack() {
  // 如果是服务端，则不执行
  if (import.meta.server) {
    return () => {}
  }

  const { webConfig } = useAppStore()

  const bigoTrack = (event: string = 'button') => {
    console.log('🚀🚀🚀 Bigo Track')
    if (!window.bge) {
      console.error('Bigo Track is not supported.')
      return () => {}
    }
    window.bge('event', event, { configId: webConfig.bigo })
  }

  return bigoTrack
}
