/**
 * @name TikTok Track
 * @description 使用 TikTok Pixel Track 跟踪广告曝光和点击
 */
export function useTikTokTrack() {
  // 如果是服务端，则不执行
  if (import.meta.server) {
    return () => {}
  }

  const ttTrack = (id: number | string, event: string = 'ClickButton') => {
    if (!window.ttq) {
      console.error('TikTok Pixel Track is not supported.')
      return () => {}
    }
    console.log('🚀🚀🚀 TikTok Track', id)
    window.ttq.track(event, {
      value: '100',
      currency: 'USD',
      contents: [
        {
          content_id: id, // 商品或内容的唯一ID
          content_name: 'ad_iframe_click', // 页面/商品的名称
          content_type: 'click', // 自定义参数
        },
      ],
    })
  }

  return ttTrack
}
