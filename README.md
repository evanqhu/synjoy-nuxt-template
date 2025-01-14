## ⚙️ 功能配置

- 基于 [Nuxt3](https://nuxt.com/) 的 SSR 项目模板
- 使用 ESLint 用于语法和样式校验 ([@/nuxt/eslint](https://eslint.nuxt.com/packages/module) 模块)
- 使用 Pinia 状态管理器 ([@pinia/nuxt](https://pinia.vuejs.org/ssr/nuxt.html) 模块)
- 使用 [vite-plugin-svg-icons](https://github.com/vbenjs/vite-plugin-svg-icons) 处理图标，封装 `SvgIcon` 组件
- 使用 [@nuxtjs/device](https://nuxt.com/modules/device) 结合自定义的 `useCUstomDevice()` 响应式获取设备类型
- 封装 Firebase 插件，全局提供 `logEvent` 和 `eventTrack` 方法
- 封装 `AdsbyGoogle` 组件
- 在服务器上使用中间件加载 `web-configs`，根据请求的 `host` 返回不同的网站配置，在服务端渲染时使用中间件加载网站配置，存储到 Pinia 中
- 在服务端使用中间件上报 header
- 使用自定义路由 `path` ，实现分渠道路由
- 封装 `useCustomPush()` 扩展 `router.push()` 方法，实现携带渠道路径和 `query` 参数跳转
- 封装 `useRequest()`，提供网络请求最佳实践
- 封装 `v-loading` 自定义指令

## ⚙️ 目录结构

```ini
├── api #【后端接口】
│   ├── modules
│   └── index.ts
├── assets #【静态资源】
│   ├── icons
│   ├── images
│   ├── logos
│   └── styles
├── components #【公共组件】
│   ├── AdsbyGoogle.vue
│   ├── SvgIcon.vue
│   ├── BaseHeader.vue
│   └── BaseFooter.vue
├── composables #【组合式 API 函数】
│   ├── index.ts
│   ├── useCustomPush.ts
│   ├── useCustomDevice.ts
│   └── useRequest.ts
├── configs #【配置文件】
│   ├── constants.ts
│   └── web-configs.ts # 网站配置
├── layouts #【布局组件】
│   ├── default.vue
│   └── policies.vue
├── middleware #【路由中间件】
│   ├── auth.global.ts
│   └── my-middleware.ts
├── pages #【路由页面】
│   ├── index.vue
│   └── detail.vue
├── plugins #【自定义插件】
│   ├── firebase.client.ts
│   ├── svg-icon.ts
│   └── load-config.server.ts
├── public #【静态资源】
│   ├── images
│   └── robots.txt
├── server #【服务器相关】
│   ├── api
│   ├── middleware
│   │   ├── report-headers.vue
│   │   └── load-config.vue
│   └── plugins
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

```json
{
  "scripts": {
    // 启动开发服务器
    "dev": "nuxi dev --dotenv .env.development --host",
    // 生产构建
    "build": "nuxi build --dotenv .env.production",
    // 开发构建
    "build:dev": "nuxi build --dotenv .env.development",
    // 测试构建
    "build:stage": "nuxi build --dotenv .env.stage",
    // 生成 .nuxt 文件夹
    "prepare": "nuxi prepare",
    // 预览 (需在打包后执行)
    "preview": "nuxi preview",
    // 生成静态文件 dist，用于部署在静态托管服务上
    "generate": "nuxi generate",
    // 服务器部署
    "deploy": "PORT=5000 node .output/server/index.mjs",
    "postinstall": "nuxi prepare",
    "lint": "eslint .",
    // 语法校验
    "lint-fix": "eslint . --fix"
  }
}
```

## ⚙️ 环境变量

`.env.development`

```ini
# 开发环境

# 静态资源路径
NUXT_APP_CDN_URL = ''

# API 接口地址
# NUXT_PUBLIC_API_BASE = 'https://jsonplaceholder.typicode.com'
NUXT_PUBLIC_API_BASE = 'http://test.ptc-pluto.ptc.sg2.api'

# 开发服务器端口号
NUXT_PORT = 1024
```

`.env.production`

```ini
# 生产环境

# 静态资源路径
NUXT_APP_CDN_URL = 'https://static.cdns.space/nuxt-template/'

# API 接口地址
NUXT_PUBLIC_API_BASE = 'https://jsonplaceholder.typicode.com'
```

`.env.stage`

```ini
# 测试环境

# 静态资源路径
NUXT_APP_CDN_URL = 'https://static-test.cdns.space/nuxt-template/'

# API 接口地址
NUXT_PUBLIC_API_BASE = 'https://jsonplaceholder.typicode.com'
```

## ⚙️ 最佳实践

### 🎯 全局样式

可以在 `nuxt.config.ts` 中配置 css 属性，引入全局样式，这里的样式文件会被加载在 HTML 文件的 `<head>` 中，但是无法使用其中的变量，如果需要使用变量，可以在 vite 的 sass 中进行配置

```javascript
// nuxt.config.ts
export default defineNuxtConfig({
  /** 全局样式文件 */
  css: ["~/assets/styles/main.scss"],

  /** Vite 配置 */
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler", // 使用新版 sass 编译器，防止控制台警告
          additionalData: '@use "~/assets/styles/variables.scss" as *;', // 引入全局样式变量
        },
      },
    },
  },
});
```

### 🎯 网络请求

> ⚠️ 默认情况下， `useAsyncData` 会阻止导航，直到其异步处理程序得到解析。这会导致路由跳转延迟，用户体验不佳。可以通过添加 `lazy: true` 选项或使用 `useLazyAsyncData`

> 如果在一个组件中需要发送多个请求，且这些请求之间没有依赖关系，则不需要加 `await`，直接获取数据即可；只有当请求之间有依赖关系时，才需要加 `await`
> 加 `await` 的作用是等待当前请求完成，这样解构拿到的 `data` 就是有数据的，如果不加，在请求完成前，拿到的 `data` 是 `null`；不过没关系，代码中会通过 `status` 判断请求是否完成，如果未完成，则显示加载动画

Nuxt 中使用 `$fetch` `useFetch` 和 `useAsyncData` 来请求数据

其中 `useFetch` 和 `useAsyncData` 都需要写在 `setup` 顶层，请求会在服务端发出，然后通过有效负载携带到客户端，客户端不再发送请求

`useFetch(url)` 几乎等同于 `useAsyncData(url, () => $fetch(url))`

```html
<script setup lang="ts">
  const { data, status, error, refresh, clear } = useAsyncData("mountains", () =>
    $fetch("https://api.nuxtjs.dev/mountains")
  );
  const { data, status, error, refresh, clear } = useFetch("/api/modules");
  // refresh 用于重新发送请求
</script>
```

1️⃣ 封装自定义 `_fetch()` 方法

在 `composables` 中新建 `useRequest.ts` 文件，对外暴露 `useRequest` 对象

```javascript
// composables/useRequest.ts
// API 接口请求 (如果有其他后端接口地址，封装其他的组合式函数)
import type { NitroFetchOptions, NitroFetchRequest } from "nitropack";

type RequestParams = NitroFetchOptions<
  NitroFetchRequest,
  "options" | "get" | "head" | "patch" | "post" | "put" | "delete" | "connect" | "trace"
>;

/** 自定义封装 $fetch 方法 */
const _fetch = $fetch.create({
  // 请求拦截器
  onRequest({ options }) {
    // 设置请求根路径
    const runtimeConfig = useRuntimeConfig();
    options.baseURL = runtimeConfig.public.apiBase;

    // 设置请求头
    const userAuth = useCookie("token");
    if (userAuth.value) {
      // Add Authorization header
      options.headers.set("Authorization", `Bearer ${userAuth.value}`);
    }
  },
  // 响应拦截器
  onResponse({ response }) {
    if (!response.ok) {
      console.error("请求失败", response.statusText);
      throw new Error(`请求错误：${response.status}`);
    }
    // 与后端约定好的接口响应格式
    const { data, code, msg, success } = response._data;
    if (!success) {
      console.error("接口错误：", msg);
      throw new Error(msg || "未知错误");
    }
    // 通过修改 response._data 来修改响应数据
    response._data = data;
    // 直接返回 data 不生效
    // return data
    // response._data = new myBusinessResponse(response._data)
  },
  // 响应错误拦截器
  onResponseError({ response }) {
    if (response.status === 401) {
      navigateTo("/login");
    }
  },
});

/** 自动导出方法 */
export const useRequest = {
  get<T>(url: string, params?: RequestParams) {
    return _fetch < T > (url, { method: "get", ...params });
  },
  post<T>(url: string, data?: Record<string, unknown>, params?: RequestParams) {
    return _fetch < T > (url, { method: "post", body: data, ...params });
  },
};
```

2️⃣ 编写请求函数

在 `api/modules` 中编写各模块的请求函数

- params 处定义请求参数的类型
- 泛型传返回值的类型

```typescript
// api/modules/blog.ts
export const getData = async (params?: string) => {
  return await useRequest.get<Array<IBlog>>("/posts");
};
```

在 `api/index.ts` 中汇总各函数

```javascript
// api/index.ts
import * as blogApi from "./modules/blog";

export default {
  blogApi,
};
```

在 `composables/index.ts` 中定义组合式函数

```javascript
// composables/index.ts
import api from "~/api/index";

/** 使用网络请求函数 */
export const useApi = () => api;
```

3️⃣ 在组件中使用

1. 通过组合式函数使用 (无需引入)

```vue
<script setup lang="ts">
const { blogApi } = useApi();

const { data: blogs, refresh } = useAsyncData("blogs", () => blogApi.getData("test params"));
// 使用 computed 定义 blogsObj，这样在调用 refresh 后，blogsObj 会响应式更新
const blogsObj = computed(() => blogs.map(...));
</script>

<template>
  <button @click="refresh('test params')">click</button>
</template>
```

2. 直接引入使用

```vue
<script setup lang="ts">
import { getData } from "~/api/modules/blog";

const { data: blogs } = useAsyncData("blogs", () => getData("test params"), { lazy: true });

const { data: blogs } = useLazyAsyncData("blogs", () => getData("test params"));
</script>
```

> 如何在 server 中定义接口，如下

```typescript
// server/api/hello.ts
// 访问 http://localhost:1024/api/hello 即可得到 { hello: "world" }
export default defineEventHandler(() => {
  return {
    hello: "world",
  };
});
```

```vue
<script setup lang="ts">
const { data: hello } = await useFetch("/api/hello");
const { data: hello } = await useAsyncData("hello", () => $fetch("/api/hello"));
console.log("🚀🚀🚀  hello: ", hello.value);
</script>
```

### 🎯 图标

1️⃣ 使用 [vite-plugin-svg-icons](https://github.com/vbenjs/vite-plugin-svg-icons) 插件

参考：https://juejin.cn/post/7311895107530883081

项目中推荐使用 `vite-plugin-svg-icons` 这个 vite 插件来实现 svg 雪碧图

1. 安装插件

```sh
pnpm i vite-plugin-svg-icons -D
```

2. 在 `nuxt.config.ts` 中新增配置

```ts
import path from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

export default defineNuxtConfig({
  /** Vite 配置 */
  vite: {
    plugins: [
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), "assets/icons"), path.resolve(process.cwd(), "assets/logos")],
      }),
    ],
  },
});
```

3. 新建 nuxt 插件

`plugins/svg-icon.ts`

```typescript
import SvgIcon from "~/components/SvgIcon/index.vue";
import "virtual:svg-icons-register";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("svg-icon", SvgIcon);
});
```

4. 创建 `SvgIcon` 组件

`components/SvgIcon.vue`

```typescript
<script lang="ts" setup>
interface Props {
  prefix?: string
  name: string
  size?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  prefix: 'icon',
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)

// 动态计算 size 样式
const svgStyle = computed(() => {
  if (!props.size) return {}

  // 如果是 number，自动添加 'px' 单位；如果是 string，按用户输入解析
  const sizeValue = typeof props.size === 'number' || /^[0-9]+$/.test(props.size) ? `${props.size}px` : props.size

  return {
    width: sizeValue,
    height: sizeValue,
  }
})
</script>

<template>
  <svg class="svg-icon" aria-hidden="true" :style="svgStyle">
    <use :href="symbolId" />
  </svg>
</template>

<style lang="scss" scoped>
.svg-icon {
  fill: currentColor;
  overflow: hidden;
}
</style>
```

5. 使用

```html
<SvgIcon name="nuxt" size="2rem" />

<SvgIcon name="nuxt" size="30" />
```

2️⃣ 使用 [@nuxt/icon](https://nuxt.com/modules/icon) 模块

官方的 icon 解决方案，也比较推荐

1. 安装模块

```shell
npx nuxi module add icon
```

2. 配置

```typescript
// nuxt.config.ts
import path from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

export default defineNuxtConfig({
  /** 模块 */
  modules: ["@nuxt/icon"],
  /** Nuxt Icon 模块 */
  icon: {
    customCollections: [
      {
        prefix: "local", // 配置本地 svg 的前缀
        dir: "./assets/icons", // 配置本地 svg 的文件夹
      },
    ],
  },
});
```

3. 使用

```html
<Icon name="local:nuxt" size="2rem" />
```

可以传 `size` `color` 等属性

3️⃣ 使用 [NuxtIcons](https://nuxt.com/modules/icons) 模块

不方便调整图标大小，不推荐使用

### 🎯 图片

使用 [NuxtImg](https://image.nuxt.com/get-started/installation) 模块

1. 安装模块

```sh
npx nuxi@latest module add image
```

2. 配置

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  /** 模块 */
  modules: ["@nuxt/image"],
});
```

3. 使用

```html
<NuxtImg src="/images/demo.jpg" />
```

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

- src 必须是**绝对路径**
- 图片必须放在 **public** 文件夹下
- 注意：图片传到 CDN 上没有用，依然加载的是服务器所在主机上的图片

如果不把图片放在 public 下，建议直接使用 img 标签即可

### 🎯 元信息

使用 `useHead` 和 `useSeoMeta` 来定义元信息

```typescript
/** 定义组件 head 数据，可在服务端渲染，可使用响应式数据 */
/** 网站图标 */
const iconHref = ref("");
try {
  iconHref.value = (await import(`~/assets/logos/${webConfig.webLogo}.svg`)).default;
} catch (error) {
  console.error("Failed to load app logo:", error);
  iconHref.value = ""; // 设置为默认值或留空
}

useSeoMeta({
  title: webConfig.webTitle,
  description: "app description",
  ogTitle: webConfig.webTitle,
});

useHead(
  {
    link: [{ rel: "icon", href: iconHref }],
  },
  { mode: "client" }
);
```

### 🎯 移动端适配

移动端和 PC 端还是写在一起，用媒体查询写不同的样式，尽量使用 rem 单位，同时也提供了 `rem()` 函数，将 px 单位转换为 rem 单位

PC 端和移动端的逻辑差异，需要使用 `NuxtDevice` 模块配合自定义的 `useCustomDevice()` 来处理

**自定义 useCustomDevice() **

原生的 [NuxtDevice](https://nuxt.com/modules/device) 模块返回的值不是响应式的，这里进行封装，增加响应式

```typescript
// composables/useCustomDevice.ts
// 自定义检测设备类型
export const useCustomDevice = () => {
  // 从 Nuxt App 获取 device module 的实例
  const { $device } = useNuxtApp();

  // 初始化响应式状态
  const isMobile = ref($device.isMobile);
  const isDesktop = ref(!$device.isMobile);

  // 更新状态的方法
  const _resizeHandler = () => {
    const userAgent = navigator.userAgent.toLocaleLowerCase();
    const matchesMobile = /mobile|android|webos|iphone|ipod|blackberry/i.test(userAgent);
    isMobile.value = matchesMobile;
    isDesktop.value = !matchesMobile;
  };

  // 监听 window resize 事件
  onMounted(() => {
    window.addEventListener("resize", _resizeHandler);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", _resizeHandler);
  });

  return {
    isMobile,
    isDesktop,
  };
};
```

使用 `useCustomDevice()` 返回的值是响应式的，切换页面大小时这个值会自动改变

```vue
<script setup lang="ts">
const { isMobile } = useCustomDevice();
</script>

<template>
  <div>isMobile: {{ isMobile }}</div>
</template>
```

### 🎯 Firebase

在 `plugins` 中新建 `firebase.client.ts` 文件，`firebase` 插件只能在客户端使用，插件自动注册

配置文件从 `appStore` 的 `webConfig` 中读取

`plugins/firebase.client.ts`

```javascript
/**
 * firebase 插件，用于提供 logEvent 和 eventTrack 方法
 * 仅在客户端运行
 */
import { getAnalytics, isSupported, logEvent } from "firebase/analytics";
import { initializeApp } from "firebase/app";

export default defineNuxtPlugin(async () => {
  // 开发环境不运行 firebase
  if (process.env.NODE_ENV === "development") {
    return {
      provide: {
        logEvent: () => {
          console.log("🚀🚀🚀 测试环境 firebase analytics");
        },
        eventTrack: () => {
          console.log("🚀🚀🚀 测试环境 firebase analytics");
        },
      },
    };
  }
  const { webConfig } = useAppStore();
  const firebaseConfig = webConfig.firebase;

  /** 初始化 Firebase */
  const initializeFirebase = () => {
    const firebaseApp = initializeApp(firebaseConfig);

    // 启用 Analytics
    const analyticsInstance = getAnalytics(firebaseApp);
    return analyticsInstance;
  };

  let customLogEvent;
  let customEventTrack;

  try {
    await isSupported();
    const analytics = initializeFirebase();

    // 记录一个名为 "in_page" 的事件，表示用户进入页面
    logEvent(analytics, "in_page");
    console.log("🚀🚀🚀 firebase analytics: ", "in_page");

    customLogEvent = (eventName: string, eventParams = {}) => {
      logEvent(analytics, eventName, eventParams);
      // console.log('🚀🚀🚀 firebase analytics: ', eventName)
    };
    customEventTrack = (eventName: string, method: string, eventParams = {}) => {
      const _eventParams = {
        time: new Date(),
        message: eventName,
        method,
        ...eventParams,
      };
      logEvent(analytics, eventName, _eventParams);
      // console.log('🚀🚀🚀 firebase analytics: ', eventName)
    };
  } catch (error) {
    console.log("🚀🚀🚀 Firebase Analytics is not supported", error);

    customLogEvent = (eventName: string, eventParams = {}) => {
      console.log(`🚀🚀🚀 Client Log: ${eventName}`, eventParams);
    };
    customEventTrack = (eventName: string, method: string, eventParams = {}) => {
      console.log(`🚀🚀🚀 Client Log: ${eventName}`, method, eventParams);
    };
  }

  return {
    provide: {
      logEvent: customLogEvent,
      eventTrack: customEventTrack,
    },
  };

  // 不需要将 $logEvent 和 $eventTrack 挂载到 Vue 实例上，放在 NuxtApp 上即可
  // nuxtApp.vueApp.provide($logEvent, _logEvent)
  // nuxtApp.vueApp.provide($eventTrack, _eventTrack)
});
```

使用时通过 `const { $eventTrack } = useNuxtApp()` 得到相应的函数

### 🎯 AdSense

1️⃣ **广告脚本**

在 `app.vue` 中通过 `useHead` 加载广告脚本，配置文件存储在 appStore 中

广告脚本仅在**生产环境**的**客户端**加载

```html
<script lang="ts" setup>
  const appStore = useAppStore();
  const { webConfig } = appStore;

  // 加载谷歌广告脚本
  useHead(
    {
      script: [
        ...(webConfig.adSense?.clientId && process.env.NODE_ENV === "production"
          ? [
              {
                src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${webConfig.adSense?.clientId}`,
                crossorigin: "anonymous" as const,
                async: true,
              },
            ]
          : []),
      ],
      link: [{ rel: "icon", href: iconHref }],
    },
    { mode: "client" }
  );
</script>
```

2️⃣ **ads.txt**

`ads.txt` 通过服务端中间件 `server/middleware/load-config.ts` 处理

**同时也是在这里根据 host 加载网站配置到 nuxt 上下文中**

```typescript
/**
 * server/middleware/load-config.ts
 * 服务器中间件
 * 根据请求的 host，加载对应的配置到 nuxtApp 的上下文中
 */
import webConfigs from "~/configs/web-configs";

export default defineEventHandler((event) => {
  // console.log('🚀🚀🚀 process.env.NODE_ENV: ', process.env.NODE_ENV)

  const originHost = getHeader(event, "host")?.split(":")[0] || "localhost";
  const host = originHost.replace(/^www\./, "");

  // console.log('🚀🚀🚀 请求的 host: ', host)

  const config = webConfigs[host] || webConfigs.localhost;

  // 将配置注入到响应的上下文中
  event.context.config = config;

  /** 处理 ads.txt 请求 */
  const url = event.node.req.url;
  // console.log('🚀🚀🚀 请求的 url: ', url)

  // 如果请求的路径是 /ads.txt
  if (url === "/ads.txt") {
    // 设置响应类型为纯文本
    event.node.res.setHeader("Content-Type", "text/plain");

    // 返回自定义的 ads.txt 内容
    event.node.res.end(config.adSense?.ads);
  }
});
```

3️⃣ **广告组件**

封装一个 `AdsbyGoogle` 组件，在组件内的 `onMounted` 生命周期中使用 `window.adsbygoogle.push({})` 方法加载广告

```vue
<!-- components/AdsbyGoogle.client.vue -->
<script lang="ts" setup>
const { $eventTrack } = useNuxtApp();
const route = useRoute();
const { webConfig } = useAppStore();

interface Props {
  /**
   * 广告配置对象 data-ad-client data-ad-slot 等
   */
  adsAttrs?: object;
  /**
   * 自定义样式
   */
  customClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  adsAttrs: () => ({}),
  customClass: "",
});

/** ins 标签模板引用 */
const adsenseRef = ref<HTMLElement>();
/** 是否显示广告（如果广告位配置对象不含 data-ad-slot 属性则不显示广告） */
const isShowAd = computed(() => {
  return Object.keys(props.adsAttrs).includes("data-ad-slot");
});
/** 广告是否填充成功（如果广告填充失败，则隐藏广告内容及标题） */
const isAdFilled = ref(true);
/** 是否进入调试模式 */
const isShowDebug = ref(false);

/** 完整的广告位配置对象 */
const adsAttrsFull = computed(() => {
  return Object.assign(
    {
      class: "adsbygoogle",
      style: "display:block",
      "data-ad-format": "auto",
      "data-full-width-responsive": "true",
      "data-ad-client": webConfig.adSense?.clientId,
    },
    props.adsAttrs
  );
});

/** 创建一个 DOM 树变动观察器 */
const observer = new MutationObserver((mutations) => {
  // 遍历监听到的 DOM 变化
  mutations.forEach((mutation) => {
    const target = mutation.target as Element;
    if (mutation.attributeName === "data-ad-status") {
      console.log("🚀🚀🚀 [AdsbyGoogle] 广告状态发生改变");
      isAdFilled.value = target.getAttribute("data-ad-status") !== "unfilled";
    }
  });
});

/** 监视广告是否加载成功，来控制是否显示广告内容区 */
const observeAdStatus = async () => {
  await nextTick();
  /** ins 标签 DOM */
  const ads = adsenseRef.value;
  if (!ads) return;

  // 观察 ins 标签的 data-ad-status 属性变化
  observer.observe(ads, {
    attributes: true, // 监听属性变动
    attributeFilter: ["data-ad-status"], // 只监听 data-ad-status 属性
  });

  // 初始化检查
  isAdFilled.value = ads.getAttribute("data-ad-status") !== "unfilled";
};

/** 展示广告 */
const showAd = async () => {
  if (!isShowAd.value) return;
  // NOTE 必须加这个，否则访问到的 ads 实例为 undefined
  await nextTick();
  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
    $eventTrack("load_ads", "expose");
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  // 开启广告调试模式
  if (route.query.db) {
    isShowDebug.value = true;
  }
  observeAdStatus();
  showAd();
});

onActivated(() => {
  showAd();
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>

<template>
  <div v-if="isShowAd" class="ads-item">
    <div v-show="isAdFilled" class="ads-content" :class="customClass">
      <div class="ads-content-title">Advertisement</div>
      <ins ref="adsenseRef" v-bind="adsAttrsFull" />
    </div>
    <div v-if="isShowDebug" class="ads-debug">
      {{ adsAttrsFull }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ads-item {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-weight: 400;
  font-size: 16px;
}

.ads-content {
  border-bottom: 1px solid #c6c6c6;
  height: fit-content;

  .ads-content-title {
    display: flex;
    place-items: center;
    font-size: 10px;
    color: #999;
    line-height: normal;

    &::before,
    &::after {
      content: "";
      flex: 1;
      border-bottom: 1px solid #c6c6c6;
    }

    &::before {
      margin-right: 15px;
    }

    &::after {
      margin-left: 15px;
    }
  }
}

.ads-debug {
  border: 2px solid red;
  margin-bottom: 2px;
  background-color: #ffe786;
  color: #000;
}
</style>
```

**使用该组件**

`ads-attrs` 是一个对象，只需要传递 `data-ad-slot` 属性即可，其他属性均已设置默认值，如果需要覆盖则可自行传递，会覆盖默认值

```html
<AdsbyGoogle :ads-attrs="adSense?.home_1" />
```

4️⃣ **广告调试**

在 `url` 后面增加 `db` `query`参数即可，如 `www.xxx.com?db=1`，表示开启 debug 模式

### 🎯 根据 host 加载网站配置

1️⃣ 在服务器上加载配置

通过服务端中间件 `server/middleware/load-config.ts` 根据请求的 host 将相应的网站配置加载到上下文，见上方 ads.txt 相关代码

```ts
event.context.config = config;
```

2️⃣ 在服务端渲染时将配置存储到状态管理器

通过服务端插件 `plugins/load-config.server.ts` 将 nuxtApp 上下文中的网站配置注入到 Pinia Store 中

```ts
// plugins/load-config.server.ts
/**
 * 服务端插件
 * 将 nuxtApp 上下文中的网站配置注入到 Pinia Store 中
 */
import type { Pinia } from "pinia";

// 将 nuxtApp 上下文中的网站配置注入到 Pinia Store 中
export default defineNuxtPlugin((nuxtApp) => {
  const pinia = nuxtApp.$pinia as Pinia;
  // 获取 Pinia Store 实例
  const appStore = useAppStore(pinia); // NOTE 下次遇到数据共享和不共享的例子时再做记录

  // 从服务端上下文中注入配置到 Pinia
  appStore.webConfig = nuxtApp.ssrContext?.event.context.config || {};
});
```

### 🎯 Header 上报

通过服务器的 `report-headers` 中间件进行上报

```ts
// server/middleware/report-headers.ts
export default defineEventHandler(async (event) => {
  const originHost = getHeader(event, "host")?.split(":")[0] || "localhost";
  const host = originHost.replace(/^www\./, "");
  const url = event.node.req.url;
  console.log("🚀🚀🚀 请求的 url: ", url);

  if (!url?.includes(".")) {
    const data = {
      dt: new Date().toISOString().split("T")[0], // 当前日期，格式为 YYYY-MM-DD
      host: host,
      path: url,
      timestamp: Date.now(),
      ...event.node.req.headers,
    };
    // 异步地发送 POST 请求到后端的 /abc 接口
    try {
      // 使用 $fetch 发送 POST 请求
      await $fetch("http://data-tr.videodownloader.software/web/report", {
        method: "POST",
        body: data,
      });
    } catch (error) {
      // 处理错误，但不影响后续的渲染
      console.error("Error sending data to /web/report:", error);
    }
  }
});
```

### 🎯 分渠道路由

> 实现分渠道路由，访问 `/` 和访问 `/channelX` 是同一个页面，X 取值为 1 ～ 99，同时在跳转路由的时候，保留路径中的 `channelX`；另外路由跳转保留 query 参数。

1️⃣ **实现路由**

在路由组件中通过 `definePageMeta` 的 `path` 配置项来自定义扩展路由

```vue
<!-- pages/index.vue -->
<script setup lang="ts">
definePageMeta({
  path: "/:channel(channel[1-9]\\d?)?", // 实现分渠道路由
});
</script>
```

也可以在 `nuxt.config.ts` 中通过 hooks 进行配置

```ts
export default defineNuxtConfig({
  hooks: {
    "pages:extend"(pages) {
      // 新增路由
      pages.push({
        name: "HomeChannel",
        path: "/:channel(channel[1-9]\\d?)",
        file: "~/pages/index.vue",
      });
    },
  },
});
```

2️⃣ **路由跳转**

封装自定义路由跳转函数，替换原生的 `route.push()` 方法

```ts
// composables/useCustomPush.ts
export const useCustomPush = () => {
  const router = useRouter();
  const { params, query } = router.currentRoute.value;
  const { channel } = params;
  const queryString = new URLSearchParams(query as Record<string, string>).toString();
  const fullChannel = channel ? `/${channel}` : "";
  const fullQueryString = queryString ? `?${queryString}` : "";

  const customPush = (path: string) => {
    router.push(`${fullChannel}${path}${fullQueryString}`);
  };

  return customPush;
};
```

```vue
<script setup lang="ts">
const customPush = useCustomPush()
</script>

<template>
  <header class="header">
    <div class="header__left" @click="customPush('/')">
  </header>
</template>
```

### 🎯 项目部署

1️⃣ **Node 服务器部署**

1. Node 版本：>20
2. 安装 pnpm：`npm install pnpm`
3. 打包：`pnpm run build`
4. 将 `.output/public` 文件夹下的全部内容上传到指定的 CDN 文件夹
5. 执行 `PORT=5000 node .output/server/index.mjs` 命令启动服务器 (或者执行 `pnpm run deploy`)

### 🎯 混合渲染

对于部分页面，比如免责声明和隐私协议等静态页面，可以在构建时 (build) 生成

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  /** 服务器路由渲染规则 */
  routeRules: {
    "/privacy-policy": { prerender: true },
  },

  /** 实验性配置 */
  experimental: {
    inlineRouteRules: true, // 启用后可以在路由组件中使用 defineRouteRules() 配置 prerender
  },
});
```

```vue
<!-- pages/privacy-policy.vue -->
<script setup lang="ts">
defineRouteRules({
  prerender: true,
});
</script>
```

可以在 `nuxt.config` 中配置 `routeRules`，也可以在路由组件中通过 `defineRouteRules` 配置 (需开启 `experimental.inlineRouteRules` 选项)。设置指定路由为 prerender，在构建时生成对应的 HTML 文件。

构建后，输出目录 `.output/public` 中会生成 `privacy-policy/index.html` 文件。访问 `/privacy-policy` 路由时会直接返回相应的 HTML 文件，服务端不再重新渲染。之后在客户端进行水合激活。



推荐使用 `defineRouteRules`
