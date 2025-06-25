/**
 * @name Facebook Track
 * @description 使用 Facebook Pixel Track 跟踪广告曝光和点击
 */
export function useFBTrack() {
  // 如果是服务端，则不执行
  if (import.meta.server) {
    return () => {}
  }

  const fbTrack = (id: number | string, event: string = 'AddToCart') => {
    console.log('🚀🚀🚀 FB Track', id)
    if (!window.fbq) {
      console.error('FB Track is not supported.')
      return () => {}
    }
    // 标准事件
    window.fbq('track', event, {
      content_ids: [id],
    })
  }

  return fbTrack
}
