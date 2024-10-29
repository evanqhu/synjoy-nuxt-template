import type { InjectionKey } from 'vue'

/** 封装 firebase 的 logEvent 方法 */
export type logEventType = (eventName: string, eventParams?: object) => void
export type eventTrackType = (eventName: string, method: string, eventParams?: object) => void

export const $logEvent = Symbol() as InjectionKey<logEventType>
export const $eventTrack = Symbol() as InjectionKey<eventTrackType>
