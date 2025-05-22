export const useTikTokTrack = () => {
  // 如果是服务端，则不执行
  if (import.meta.server) {
    return () => {}
  }

  const ttTrack = (id?: number | string, type: string = 'expose', name: string = 'ad') => {
    console.log('🚀🚀🚀 TikTok Track', id)
    if (!window.ttq) {
      console.error('TikTok Pixel Track is not supported.')
      return () => {}
    }
    window.ttq.track('ClickButton', {
      value: '100', // number. Value of the order or items sold. Example: 100.
      currency: 'USD', // string. The 4217 currency code. Example: "USD".
      contents: [
        {
          content_id: id, // string. ID of the product. Example: "1077218".
          content_type: type, // string. Either product or product_group.
          content_name: name, // string. The name of the page or product. Example: "shirt".
        },
      ],
    })
  }

  return ttTrack
}
