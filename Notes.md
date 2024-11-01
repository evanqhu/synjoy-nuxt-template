## ⚙️ 进展
* 配置 ESLint：使用 @/nuxt/eslint 模块
* 安装 sass
* 网络请求最佳实践
* 安装 nuxt-icons 模块
* 安装 nuxt-img 模块，图片懒加载
* 安装 NuxtDevice 模块
* 封装 firebase 插件（待优化）
* 封装 Adsbygoogle 组件（待优化）

## ⚙️ 待办

- [ ] vite 图片压缩插件
- [ ] 环境变量（重要）


## ⚙️ 目录结构
```ini
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

## ⚙️ Nuxt 常用 API

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

## ⚙️ 最佳实践

### 🎯 全局样式

可以在 `nuxt.config.ts` 中配置 css 属性，引入全局样式，这里的样式文件会被加载在 HTML 文件的 head 中，但是无法使用其中的变量，如果需要使用变量，可以在 vite 的 sass 中进行配置

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
          api: 'modern-compiler', // 使用新版 sass 编译器，防止控制台警告
          additionalData: '@use "~/assets/styles/variables.scss" as *;', // 引入全局样式变量
        },
      },
    },
  },
})
```

### 🎯 网络请求

Nuxt 中使用 `$fetch` `useFetch` 和 `useAsyncData` 来请求数据，其中后面两种请求都需要写在 `setup` 顶层，请求会在服务端发出，然后通过有效负载携带到客户端，客户端不再发送请求

`useFetch(url)` 几乎等同于 `useAsyncData(url, () => $fetch(url))`

#### 封装自定义 `$fetch` 方法 (组合式函数)

在 `composables` 中新建 `useRequest.ts` 文件，对外暴露 `useRequest` 对象

```javascript
// useRequest.ts
// API 接口请求 (如果有其他后端接口地址，封装其他的组合式函数)
import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'

type RequestParams = NitroFetchOptions<NitroFetchRequest, 'options' | 'get' | 'head' | 'patch' | 'post' | 'put' | 'delete' | 'connect' | 'trace'>

/** 自定义封装 $fetch 方法 */
const _fetch = $fetch.create({
  // 请求拦截器
  onRequest({ options }) {
    const { public: { baseURL } } = useRuntimeConfig()
    const userAuth = useCookie('token')
    options.baseURL = baseURL
    if (userAuth.value) {
      // Add Authorization header
      options.headers.set('Authorization', `Bearer ${userAuth.value}`)
    }
  },
  // 响应拦截器
  onResponse() {
    // response._data = new myBusinessResponse(response._data)
  },
  // 响应错误拦截器
  onResponseError({ response }) {
    if (response.status === 401) {
      navigateTo('/login')
    }
  },
})

/** 自动导出方法 */
export const useRequest = {
  get<T>(url: string, params?: RequestParams) {
    return _fetch<T>(url, { method: 'get', ...params })
  },
  post<T>(url: string, data?: Record<string, unknown>, params?: RequestParams) {
    return _fetch<T>(url, { method: 'post', body: data, ...params })
  },
}
```

#### 编写请求函数

在 `api/modules` 中编写各模块的请求函数

params 处定义请求参数的类型

泛型传返回值的类型

```javascript
// api/modules/blog.ts
export const getData = (params?: string) => {
  console.log('🚀🚀🚀 params: ', params)
  return useRequest.get<Array<unknown>>('/posts')
}
```

在 `api/index.ts` 中汇总各函数

```javascript
// api/index.ts
import * as blogApi from './modules/blog'

export default {
  blogApi,
}
```

在 `composables/index.ts` 中定义组合式函数

```javascript
// composables/index.ts
import api from '~/api/index'

/** 使用网络请求函数 */
export const useApi = () => api
```

#### 在组件中使用

使用组合式函数的优点是无需引入

```javascript
const { blogApi } = useApi()

const { data: blogs } = await useAsyncData('blogs', () => blogApi.getData('test params'))
```

```html
<button @click="blogApi.getData('test params')">
  click
</button>
```

### 🎯 图标

使用 `NuxtIcons` 模块 https://nuxt.com/modules/icons

```html
<NuxIcon name="nuxt" filled />
```

### 🎯 图片懒加载

使用 `NuxtImg` 模块 https://image.nuxt.com/get-started/installation

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

### 🎯 移动端适配

暂时还是不使用 rem 单位，移动端和 PC 端的样式都使用 px 绝对单位进行布局，使用媒体查询来写

PC 端和移动端的逻辑差异，需要使用 `NuxtDevice` 模块来处理

### 🎯 设备判断

使用 NuxtDevice 模块判断设备类型 https://nuxt.com/modules/device

但是在设备类型切换的时候无法检测到自动切换**（待处理）**

### 🎯 Firebase

在 `plugins` 中新建 `firebase.client.ts` 文件，`firebase` 插件只能在客户端使用，插件自动注册

配置文件写在 .env 中，传递给 `runtimeConfig.public`

```javascript
// 仅在客户端运行的插件
import { getAnalytics, isSupported, logEvent } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { $logEvent, $eventTrack } from '~/configs/constants'

export default defineNuxtPlugin(async (nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  const firebaseConfig = runtimeConfig.public.firebase

  /** 初始化 Firebase */
  const initializeFirebase = () => {
    const firebaseApp = initializeApp(firebaseConfig)

    // 启用 Analytics
    const analyticsInstance = getAnalytics(firebaseApp)
    return analyticsInstance
  }

  try {
    await isSupported()
    const analytics = initializeFirebase()

    // 记录一个名为 "in_page" 的事件，表示用户进入页面
    logEvent(analytics, 'in_page')
    console.log('🚀🚀🚀 firebase analytics: ', 'in_page')

    const _logEvent = (eventName: string, eventParams = {}) => {
      logEvent(analytics, eventName, eventParams)
      // console.log('🚀🚀🚀 firebase analytics: ', eventName)
    }
    const _eventTrack = (eventName: string, method: string, eventParams = {}) => {
      const _eventParams = {
        time: new Date(),
        message: eventName,
        method,
        ...eventParams,
      }
      logEvent(analytics, eventName, _eventParams)
      // console.log('🚀🚀🚀 firebase analytics: ', eventName)
    }

    nuxtApp.vueApp.provide($logEvent, _logEvent)
    nuxtApp.vueApp.provide($eventTrack, _eventTrack)
  }
  catch (error) {
    console.log('🚀🚀🚀 Firebase Analytics is not supported', error)

    const _logEvent = (eventName: string, eventParams = {}) => {
      console.log(`🚀🚀🚀 Client Log: ${eventName}`, eventParams)
    }
    const _eventTrack = (eventName: string, method: string, eventParams = {}) => {
      console.log(`🚀🚀🚀 Client Log: ${eventName}`, method, eventParams)
    }

    nuxtApp.vueApp.provide($logEvent, _logEvent)
    nuxtApp.vueApp.provide($eventTrack, _eventTrack)
  }
})
```

通过 `nuxtApp.vueApp.provide()` 将记录事件的函数传递出去

### 🎯 AdSense

在 `app.vue` 中通过 `useHead` 加载广告脚本

配置文件写在 .env 中，传递给 `runtimeConfig.public`

封装一个 `Adsbygoogle` 组件，在组件内的 `onMounted` 生命周期中使用 `window.adsbygoogle.push({})` 方法加载广告

```vue
<script lang="ts" setup>
import { $eventTrack, type eventTrackType } from '~/configs/constants'

const route = useRoute()
const eventTrack = inject($eventTrack) as eventTrackType

defineOptions({
  name: 'AdsbyGoogle',
})

interface Props {
  /**
   * 广告配置对象 data-ad-client data-ad-slot 等
   */
  adsAttrs: object
  /**
   * 自定义样式
   */
  customClass?: string
}

withDefaults(defineProps<Props>(), {
  adsAttrs: () => ({}),
  customClass: '',
})

/** ins 标签模板引用 */
const adsenseRef = ref<HTMLElement>()
/** 广告是否显示 */
const isAdFilled = ref(true)
/** 是否进入调试模式 */
const showDebug = ref(false)

let observer: MutationObserver

/** 监视广告是否加载成功，来控制是否显示广告内容区 */
const observeAdStatus = () => {
  /** ins 标签 DOM */
  const ads = adsenseRef.value
  if (!ads) return

  // 监听 DOM 树变动
  observer = new MutationObserver((mutations) => {
    // 遍历监听到的 DOM 变化
    mutations.forEach((mutation) => {
      const target = mutation.target as Element
      if (mutation.attributeName === 'data-ad-status') {
        isAdFilled.value = target.getAttribute('data-ad-status') !== 'unfilled'
      }
    })
  })

  observer.observe(ads, {
    attributes: true, // 监听属性变动
    attributeFilter: ['data-ad-status'], // 只监听 data-ad-status 属性
  })

  // 初始化检查
  isAdFilled.value = ads.getAttribute('data-ad-status') !== 'unfilled'
}

/** 展示广告 */
const showAd = async () => {
  await nextTick()
  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({})
    eventTrack('load_ads', 'expose')
  }
  catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  // 开启广告调试模式
  if (route.query.db) {
    showDebug.value = true
  }
  showAd()
  observeAdStatus()
})

onActivated(() => {
  showAd()
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <div class="ads-item">
    <div
      v-show="isAdFilled"
      class="ads-content"
      :class="customClass"
    >
      <div class="ads-content-title">
        Advertisement
      </div>
      <ins
        ref="adsenseRef"
        v-bind="adsAttrs"
      />
    </div>
    <div
      v-if="showDebug"
      class="ads-debug"
    >
      {{ adsAttrs }}
    </div>
  </div>
</template>
```

在页面中使用该组件时使用 `<ClientOnly>` 包裹，防止服务端出现 inject 报错，因为 provide 是在客户端执行的

```html
<ClientOnly>
  <Adsbygoogle :ads-attrs="adSense.home_1" />
</ClientOnly>
```

### 🎯 环境变量

待处理

## 注意事项

* 手动安装一下 typescript 和 vite `pn i typescript -D` `pn i vite`
