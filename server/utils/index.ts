import type { H3Event } from 'h3'

/** 获取请求的 host */
export function getHost(event: H3Event): string {
  const host = getHeader(event, 'host')?.split(':')[0] || 'localhost'
  return host.replace(/^www\./, '')
}
