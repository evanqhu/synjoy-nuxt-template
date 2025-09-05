/**
 * @name Bing Track
 * @description 使用 Bing Pixel Track 跟踪广告曝光和点击
 */
export function useBingTrack() {
  // 如果是服务端，则不执行
  if (import.meta.server) {
    return () => {}
  }

  const bingTrack = (id: number | string, event: string = 'outbound_click') => {
    if (!window.uetq) {
      console.error('Bing Track is not supported.')
      return () => {}
    }
    console.log('🚀🚀🚀 Bing Track', id)
    // 标准事件
    window.uetq.push('event', event, {
      revenue_value: '100',
      currency: 'USD',
    })
  }

  return bingTrack
}
