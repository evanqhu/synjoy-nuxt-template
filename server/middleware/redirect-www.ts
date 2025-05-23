/** 重定向 www 域名 */
export default eventHandler((event) => {
  const host = getRequestHeader(event, 'host') || ''

  if (host.startsWith('www.')) {
    const nonWwwHost = host.replace(/^www\./, '')
    const url = getRequestURL(event)
    const redirectUrl = `${url.protocol}//${nonWwwHost}${url.pathname}${url.search}`

    return sendRedirect(event, redirectUrl, 301)
  }
})
