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

```shell
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



## ⚙️ 脚本介绍

```ini
"scripts": {
	# 启动开发服务器
  "dev": "nuxi dev --dotenv .env.development --host",
  # 生产构建
  "build": "nuxi build --dotenv .env.production",
  # 开发构建
  "build:dev": "nuxi build --dotenv .env.development",
  # 测试构建
  "build:stage": "nuxi build --dotenv .env.stage",
  "generate": "nuxi generate",
  # 预览（需在打包后执行）
  "preview": "nuxi preview",
  # 服务器部署
  "deploy": "PORT=5000 node .output/server/index.mjs",
  "postinstall": "nuxi prepare",
  "lint": "eslint .",
  # 语法校验
  "lint-fix": "eslint . --fix"
  },
```

### 环境变量

`.env.development`

```ini
# 开发环境

# 打包路径
NUXT_APP_BASE_URL = '/' # https://static.cdns.space/dailyhoroscope/

# API 接口地址
NUXT_PUBLIC_BASE_URL = 'https://jsonplaceholder.typicode.com'

# 开发服务器端口号
NUXT_PORT = 1024
```

`.env.production`

```ini
# 生产环境

# 打包路径
NUXT_APP_BASE_URL = '/prod/' # https://static.cdns.space/dailyhoroscope/

# API 接口地址
NUXT_PUBLIC_BASE_URL = 'https://jsonplaceholder.typicode.com'
```

`.env.stage`

```ini
# 测试环境

# 打包路径
NUXT_APP_BASE_URL = '/test/' # http://static-test.cdns.space/dailyhoroscope/

# API 接口地址
NUXT_PUBLIC_BASE_URL = 'https://jsonplaceholder.typicode.com'
```



## ⚙️ Nuxt 常用 API

### 工具函数

#### `defineNuxtRouteMiddleware`

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

#### `definePageMeta`

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

#### `defineNuxtPlugin`

在 `plugins` 中使用，可以用来定义插件

```javascript
export default defineNuxtPlugin(nuxtApp => {
  // Doing something with nuxtApp
})
```

#### `defineEventHandler`

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

> 如果没有安装其他 UI 框架，可以先安装 `normalize` 包，修改浏览器默认样式
>

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

Nuxt 中使用 `$fetch` `useFetch` 和 `useAsyncData` 来请求数据

其中 `useFetch` 和 `useAsyncData` 都需要写在 `setup` 顶层，请求会在服务端发出，然后通过有效负载携带到客户端，客户端不再发送请求

`useFetch(url)` 几乎等同于 `useAsyncData(url, () => $fetch(url))`

```html
<script setup lang="ts">
const { data, status, error, refresh, clear } = await useAsyncData(
  'mountains',
  () => $fetch('https://api.nuxtjs.dev/mountains')
)
</script>

<script setup lang="ts">
const { data, status, error, refresh, clear } = await useFetch('/api/modules')
</script>
```

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

```typescript
// api/modules/blog.ts
interface IBlog {
  id: number
  userId: number
  title: string
  body: string
}

export const getData = (params?: string) => {
  console.log('🚀🚀🚀 params: ', params)
  return useRequest.get<Array<IBlog>>('/posts')
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

1️⃣ 直接引入使用

```typescript
import { getData } from '~/api/modules/blog'

// 方法 2：直接使用
const { data: blogs } = await useAsyncData('blogs', () => getData('test params'))
```

2️⃣ 通过组合式函数使用（无需引入）

```javascript
const { blogApi } = useApi()

/** 后端接口 */
// 方法 1：通过组合式函数使用（推荐）
const { data: blogs } = await useAsyncData('blogs', () => blogApi.getData('test params'))
```

```html
<button @click="blogApi.getData('test params')">
  click
</button>
```

#### 在 server 中定义接口

`server/api/hello.ts`

```typescript
// 访问 http://localhost:1024/api/hello 即可得到 { hello: "world" }
export default defineEventHandler(() => {
  return {
    hello: 'world',
  }
})
```

```typescript
/** server 中的接口 */
const { data: hello } = await useFetch('/api/hello')
const { data: hello } = await useAsyncData('hello', () => $fetch('/api/hello'))
console.log('🚀🚀🚀  hello: ', hello.value)
```

### 🎯 图标

使用 `NuxtIcons` 模块 https://nuxt.com/modules/icons

```html
<NuxIcon name="nuxt" filled />
```

* svg 默认文件夹 `assets/icons`

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

<NuxtImg src="/demo.jpg" />
```

> 当设置 loading='lazy' 时，图片出现在视口时才会被加载，但是根据浏览器的特性，不一定是完全出现在视口才会加载，比如在谷歌浏览器中，当图片距离顶部的距离小于 3000px 时，图片就会被加载

* src 必须是绝对路径
* 图片默认位置为 public 文件夹，可以在配置文件中修改**（但是修改打包后无法加载图片）**
* 所以还是将图片放在 public 文件夹下，直接用 NuxtImg 加绝对路径

```typescript
export default defineNuxtConfig({
  /** NuxtImg 配置 */
  image: {
    dir: 'assets/images', // 图片存放目录(改了也不行，打包后有问题)
  },
})
```

如果不把图片放在 public 下，建议直接使用 img 标签即可

### 🎯 元信息

使用 `useHead` 和 `useSeoMeta` 来定义元信息

```typescript
/** 定义组件 head 数据，可在服务端渲染，可使用响应式数据 */
useHead({
  title: 'My App',
  meta: [{ name: 'description', content: 'My amazing site.' }],
  bodyAttrs: { class: 'test' },
  script: [{ innerHTML: 'console.log(\'Hello world\')' }],
})
useSeoMeta({
  title: 'My Amazing Site',
  ogTitle: 'My Amazing Site',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
```

### 🎯 移动端适配

暂时还是不使用 rem 单位，移动端和 PC 端的样式都使用 px 绝对单位进行布局，使用媒体查询来写

PC 端和移动端的逻辑差异，需要使用 `NuxtDevice` 模块来处理

### 🎯 设备判断

使用 NuxtDevice 模块判断设备类型 https://nuxt.com/modules/device

但是在设备类型切换的时候无法检测到自动切换**（待处理）**

```html
<script>
const { isMobile, isDesktop, isTablet } = useDevice()
</script>

<div v-if="$device.isDesktop">
  Desktop
</div>
<div v-else-if="$device.isTablet">
  Tablet
</div>
<div v-else>
  Mobile
</div>
```

### 🎯 Firebase

在 `plugins` 中新建 `firebase.client.ts` 文件，`firebase` 插件只能在客户端使用，插件自动注册

配置文件从 appStore 的 webConfig 中读取

`plugins/firebase.client.ts`

```javascript
// 仅在客户端运行的插件
import { getAnalytics, isSupported, logEvent } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'

export default defineNuxtPlugin(async () => {
  const { webConfig } = useAppStore()
  const firebaseConfig = webConfig.firebase

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

    return {
      provide: {
        logEvent: _logEvent,
        eventTrack: _eventTrack,
      },
    }

    // 不需要将 $logEvent 和 $eventTrack 挂载到 Vue 实例上，放在 NuxtApp 上即可
    // nuxtApp.vueApp.provide($logEvent, _logEvent)
    // nuxtApp.vueApp.provide($eventTrack, _eventTrack)
  }
  catch (error) {
    console.log('🚀🚀🚀 Firebase Analytics is not supported', error)

    const _logEvent = (eventName: string, eventParams = {}) => {
      console.log(`🚀🚀🚀 Client Log: ${eventName}`, eventParams)
    }
    const _eventTrack = (eventName: string, method: string, eventParams = {}) => {
      console.log(`🚀🚀🚀 Client Log: ${eventName}`, method, eventParams)
    }

    return {
      provide: {
        logEvent: _logEvent,
        eventTrack: _eventTrack,
      },
    }
  }
})
```

使用时通过 `const { $eventTrack } = useNuxtApp()` 得到相应的函数

### 🎯 AdSense

在 `app.vue` 中通过 `useHead` 加载广告脚本，配置文件存储在 appStore 中

```html
<script lang="ts" setup>
const appStore = useAppStore()
const { webConfig } = appStore

// 加载谷歌广告脚本
useHead({
  script: [{
    src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${webConfig.adSense.clientId}`,
    crossorigin: 'anonymous',
    async: true,
  }],
})
</script>
```

封装一个 `AdsbyGoogle` 组件，在组件内的 `onMounted` 生命周期中使用 `window.adsbygoogle.push({})` 方法加载广告

组件仅在客户端运行

`ads.txt` 通过服务端中间件 `server/middleware/load-config.ts` 处理

`server/middleware/load-config.ts`

```typescript
/**
 * 服务器中间件
 * 根据请求的 host，加载对应的配置到 nuxtApp 的上下文中
 */
import webConfigs from '~/configs/web-configs'

export default defineEventHandler((event) => {
  const originHost = getHeader(event, 'host')?.split(':')[0] || 'localhost'
  const host = originHost.replace(/^www\./, '')

  console.log('🚀🚀🚀 请求的 host: ', host)

  const config = webConfigs[host] || webConfigs['localhost']

  // 将配置注入到响应的上下文中
  event.context.config = config

  /** 处理 ads.txt 请求 */
  const url = event.node.req.url
  console.log('🚀🚀🚀 请求的 url: ', url)

  // 如果请求的路径是 /ads.txt
  if (url === '/ads.txt') {
    // 设置响应类型为纯文本
    event.node.res.setHeader('Content-Type', 'text/plain')

    // 返回自定义的 ads.txt 内容
    event.node.res.end(config.adSense.ads)
  }
})
```

`components/AdsbyGoogle.client.vue`

```vue
<script lang="ts" setup>
const { $eventTrack } = useNuxtApp()
const route = useRoute()
const { webConfig } = useAppStore()

interface Props {
  /**
   * 广告配置对象 data-ad-client data-ad-slot 等
   */
  adsAttrs?: object
  /**
   * 自定义样式
   */
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  adsAttrs: () => ({}),
  customClass: '',
})

/** ins 标签模板引用 */
const adsenseRef = ref<HTMLElement>()
/** 是否显示广告（如果广告位配置对象不含 data-ad-slot 属性则不显示广告） */
const isShowAd = computed(() => {
  return Object.keys(props.adsAttrs).includes('data-ad-slot')
})
/** 广告是否填充成功（如果广告填充失败，则隐藏广告内容及标题） */
const isAdFilled = ref(true)
/** 是否进入调试模式 */
const isShowDebug = ref(false)

/** 完整的广告位配置对象 */
const adsAttrsFull = computed(() => {
  return Object.assign(
    {
      'class': 'adsbygoogle',
      'style': 'display:block',
      'data-ad-format': 'auto',
      'data-full-width-responsive': 'true',
      'data-ad-client': webConfig.adSense?.clientId,
    },
    props.adsAttrs,
  )
})

/** 创建一个 DOM 树变动观察器 */
const observer = new MutationObserver((mutations) => {
  // 遍历监听到的 DOM 变化
  mutations.forEach((mutation) => {
    const target = mutation.target as Element
    if (mutation.attributeName === 'data-ad-status') {
      console.log('🚀🚀🚀 [AdsbyGoogle] 广告状态发生改变')
      isAdFilled.value = target.getAttribute('data-ad-status') !== 'unfilled'
    }
  })
})

/** 监视广告是否加载成功，来控制是否显示广告内容区 */
const observeAdStatus = async () => {
  await nextTick()
  /** ins 标签 DOM */
  const ads = adsenseRef.value
  if (!ads) return

  // 观察 ins 标签的 data-ad-status 属性变化
  observer.observe(ads, {
    attributes: true, // 监听属性变动
    attributeFilter: ['data-ad-status'], // 只监听 data-ad-status 属性
  })

  // 初始化检查
  isAdFilled.value = ads.getAttribute('data-ad-status') !== 'unfilled'
}

/** 展示广告 */
const showAd = async () => {
  if (!isShowAd.value) return
  // NOTE 必须加这个，否则访问到的 ads 实例为 undefined
  await nextTick()
  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({})
    $eventTrack('load_ads', 'expose')
  }
  catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  // 开启广告调试模式.value
  if (route.query.db) {
    isShowDebug.value = true
  }
  observeAdStatus()
  showAd()
})

onActivated(() => {
  showAd()
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <div v-if="isShowAd" class="ads-item">
    <div v-show="isAdFilled" class="ads-content" :class="customClass">
      <div class="ads-content-title">
        Advertisement
      </div>
      <ins ref="adsenseRef" v-bind="adsAttrsFull" />
    </div>
    <div v-if="isShowDebug" class="ads-debug">
      {{ adsAttrsFull }}
    </div>
  </div>
</template>
```

使用该组件

* `ads-attrs` 是一个对象，只需要传递 `data-ad-slot` 属性即可，其他属性均已设置默认值，如果需要覆盖则可自行传递，会覆盖默认值

```html
<AdsbyGoogle :ads-attrs="adSense.home_1" />
```



## 注意事项

* 手动安装一下 typescript 和 vite `pn i typescript -D` `pn i vite`
* 手动安装 `vue-tsc` 用于类型检查，`pn i vue-tsc -D`
