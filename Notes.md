## 进展
* 配置 ESLint：使用 @/nuxt/eslint 模块
* 安装 sass
* 网络请求最佳实践
* 安装 nuxt-icons
* 安装 nuxt-img，图片懒加载
* 

## 待办

- [ ] rem 适配，移动端
- [ ] adsense 封装
- [ ] firebase 封装
- [ ] useDevice 封装
- [ ] vite 图片压缩插件


## 目录结构
```bash
├── api #【后端接口】
│   ├── modules
│   └── service.ts
├── assets #【静态资源】
│   ├── images
│   └── styles
├── components #【公共组件】
│   ├── AppHeader.vue
│   └── AppFooter.vue
├── composables #【组合式 API 函数】
│   ├── useCustomFetch.ts # 封装 useFetch
│   └── useBar.ts
├── content #【静态内容】
│   └── index.md
├── layouts #【布局组件】
│   ├── default.vue
│   └── about.vue
├── middleware #【路由中间件】
│   ├── auth.global.ts
│   └── my-middleware.ts
├── modules #【模块】
├── pages #【路由页面】
│   ├── index.vue
│   ├── user.vue
│   └── user
│       └── profile.vue
├── plugins #【自定义插件】
│   ├── customFetch.ts # 封装 $fetch
│   └── foo.ts
├── public #【静态资源】
│   ├── favicon.ico
│   └── og-image.png
├── server #【服务器相关】
│   ├── api
│   ├── routes
│   └── middleware
├── stores #【状态管理器】
│   ├── app.ts
│   └── others.ts
├── utils #【工具函数】
│   └── index.ts
├── .env
├── app.vue
├── app.config.ts
├── error.vue
└── nuxt.config.ts
```

## Nuxt 常用 API

### 工具函数

#### defineNuxtRouteMiddleware

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

#### definePageMeta

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

#### defineNuxtPlugin

在 `plugins` 中使用，可以用来定义插件

```javascript
export default defineNuxtPlugin(nuxtApp => {
  // Doing something with nuxtApp
})
```

#### defineEventHandler

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

可以在 `nuxt.config.ts` 中配置 css 属性，引入全局样式，这里的样式文件会被加载在 html 文件的 head 中，但是无法使用其中的变量，如果需要使用变量，可以在 vite 的 sass 中进行配置

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

#### 封装自定义 $fetch 方法

在 plugins 中新建 customFetch.ts 文件

```javascript
// 定义全局自定义 $customFetch 方法的插件
export default defineNuxtPlugin(() => {
  const userAuth = useCookie('token')
  const runtimeConfig = useRuntimeConfig()

  const $customFetch = $fetch.create({
    baseURL: runtimeConfig.public.baseURL ?? 'http://localhost:3000',
    onRequest({ request, options, error }) {
      if (userAuth.value) {
        // Add Authorization header
        options.headers.set('Authorization', `Bearer ${userAuth.value}`)
      }
    },
    onResponse({ response }) {
      // response._data = new myBusinessResponse(response._data)
    },
    onResponseError({ response }) {
      if (response.status === 401) {
        navigateTo('/login')
      }
    },
  })
  // 向 nuxtApp 全局上下文提供自定义的 $customFetch 方法（Expose to useNuxtApp().$customFetch）
  return {
    provide: {
      customFetch: $customFetch,
    },
  }
})
```

#### 封装自定义 useCustomFetch 方法

在 composables 中新建 useCustomFetch.ts 文件

```javascript
// 替代原生 useFetch 方法
import type { UseFetchOptions } from 'nuxt/app'

export function useCustomFetch<T>(
  url: string | (() => string),
  options: UseFetchOptions<T> = {},
) {
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$customFetch, // 将自定义的 fetch 方法传递给 useFetch
  })
}
```

#### 编写请求函数

在 api 中新建 service.ts 文件

```javascript
import type { NitroFetchOptions } from 'nitropack'
// 封装网络请求函数
// TODO 感觉这里的类型定义写的不好
export function customFetch(url: string, options?: NitroFetchOptions<string, 'options' | 'get' | 'head' | 'patch' | 'post' | 'put' | 'delete' | 'connect' | 'trace'>) {
  return useNuxtApp().$customFetch(url, options)
}
```

之后在 modules 中编写相应模块的请求函数

```javascript
import { customFetch } from '../service'

export const getData = async (params?: string) => {
  return customFetch('/posts')
}

```

#### 在组件中使用

```javascript
const { data: blogs } = await useAsyncData('blogs', () => getData('test params'))
```

```html
<button @click="getData('test params')">
  click
</button>
```

### 图标

使用 Nuxt Icons 模块 https://nuxt.com/modules/icons

```html
<NuxIcon name="nuxt" filled />
```

### 图片懒加载

使用 Nuxt Img 模块 https://image.nuxt.com/get-started/installation

```html
<NuxtImg
  provider="cloudinary"
  src="/remote/nuxt-org/blog/going-full-static/main.png"
  width="300"
  height="169"
  loading="lazy"
/>
```

> 当设置 loading='lazy' 时，图片出现在视口时才会被加载，但是根据浏览器的特性，不一定是完全出现在视口才会加载，比如在谷歌浏览器中，当图片距离顶部的距离小于 3000px 时，图片就会被加载
>

## 注意事项

* 手动安装一下 typescript 和 vite `pn i typescript -D` `pn i vite`
