export const useFBTrack = () => {
  // 如果是服务端，则不执行
  if (import.meta.server) {
    return () => {}
  }

  const fbTrack = (ads: string) => {
    console.log('🚀🚀🚀 FB Track', ads)
    if (!window.fbq) {
      console.error('FB Track is not supported.')
      return () => {}
    }
    window.fbq('track', 'AddToCart', {
      content_ids: [ads],
    })
  }

  return fbTrack
}
