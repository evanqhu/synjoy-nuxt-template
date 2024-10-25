## 进展
* 配置 ESLint：使用 @/nuxt/eslint 模块
* 安装 sass


## 目录结构
```bash
├── assets 【静态资源】
│   ├── imgs
│   └── styles
├── components 【公共组件】
│   ├── AppHeader.vue
│   └── AppFooter.vue
├── composables 【组合式 API 函数】
│   ├── useFoo.ts
│   └── useBar.ts
├── content 【静态内容】
│   └── index.md
├── layouts 【布局组件】
│   ├── default.vue
│   └── about.vue
├── middleware 【路由中间件】
│   ├── auth.global.ts
│   └── my-middleware.ts
├── modules 【模块】
├── pages 【路由页面】
│   ├── index.vue
│   ├── user.vue
│   └── user
│       └── profile.vue
├── plugins 【自定义插件】
│   └── foo.ts
├── public 【静态资源】
│   ├── favicon.ico
│   └── og-image.png
├── server 【服务器相关】
│   ├── api
│   ├── routes
│   └── middleware
├── utils 【工具函数】
│   └── index.ts
├── .env
├── app.vue
├── app.config.ts
├── error.vue
└── nuxt.config.ts
```

## 组合式函数



## 工具函数

### defineNuxtRouteMiddleware

在 `middleware` 中使用，用来定义路由中间件；路由中间件是接收当前路由和下一个路由作为参数的导航守卫

```javascript
export default defineNuxtRouteMiddleware((to, from) => {
  if (to.params.id === '1') {
    return abortNavigation()
  }
  // In a real app you would probably not redirect every route to `/`
  // however it is important to check `to.path` before redirecting or you
  // might get an infinite redirect loop
  if (to.path !== '/') {
    return navigateTo('/')
  }
})
```

### definePageMeta

在 `pages` 中使用，可以使用它为位于 pages 目录中的页面组件设置元数据

```html
<script setup lang="ts">
definePageMeta({
  name: '',
  layout: 'default',
  middleware: ,
  ...
})
</script>
```

### defineNuxtPlugin

在 `plugins` 中使用，可以用来定义插件

```javascript
export default defineNuxtPlugin(nuxtApp => {
  // Doing something with nuxtApp
})
```

### defineEventHandler

在 `server` 中使用，可以用来处理接口

如果在 `server/api/hello.ts` 文件中定义一下代码，则访问 localhost:3000/api/hello 时即可接收到返回的数据

```javascript
export default defineEventHandler((event) => {
  return {
    hello: 'world'
  }
})
```



## 最佳实践

### 全局样式

可以在 nuxt.config.ts 中配置 css 属性，引入全局样式，这里的样式文件会被加载在 html 文件的 head 中，但是无法使用其中的变量，如果需要使用变量，可以在 vite 的 sass 中进行配置

如果没有安装其他 UI 框架，可以先安装 `normalize` 包，修改浏览器默认样式

```javascript
// nuxt.config.ts
export default defineNuxtConfig({
  /** 全局样式文件 */
  css: ['normalize.css', '~/assets/styles/main.scss'],
  
  /** Vite 配置 */
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler', // 使用新版 sass 编译器
          additionalData: '@use "~/assets/styles/variables.scss" as *;', // 引入全局样式变量
        },
      },
    },
  },
})
```

### 网络请求

Nuxt 中使用 `$fetch` `useFetch` 和 `useAsyncData` 来请求数据，其中后面两种请求都需要写在 setup 顶层，请求会在服务端发出，然后通过有效负载携带到客户端，客户端不再发送请求

`useFetch(url)` 几乎等同于 `useAsyncData(url, () => $fetch(url))`





## 注意事项

* 手动安装一下 typescript 和 vite `pn i typescript -D` `pn i vite`
