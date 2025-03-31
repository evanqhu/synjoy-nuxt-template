// 汇总各模块请求函数，统一导出
import * as defaultApi from './modules/default'
import * as userApi from './modules/user'

export const api = {
  defaultApi,
  userApi,
}
