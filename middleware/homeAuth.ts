// 命名路由中间件，在路由组件中使用该中间件，在路由进入时执行
export default defineNuxtRouteMiddleware((_to, _from) => {
  // console.log("🚀🚀🚀  home from: ", from);
  // console.log("🚀🚀🚀  home to: ", to);
  // return navigateTo(to);
})
