/**
 * Nuxt3 插件：v-loading 自定义指令
 * 用于在元素上显示加载状态的遮罩层和加载动画
 * 使用方式：v-loading="boolean"
 * 安装了 element plus，该插件弃用
 */
/**
 * 定义加载配置的接口
 */
interface LoadingOptions {
  show?: boolean // 是否显示加载
  text?: string // 加载文字
  textColor?: string // 文字颜色
  textSize?: string // 文字大小
  spinnerColor?: string // 加载动画颜色
  backgroundColor?: string // 背景色
}

export default defineNuxtPlugin((nuxtApp) => {
  /**
   * 创建加载组件的 DOM 结构，返回加载组件的 DOM 元素
   */
  const createLoadingComponent = (options: LoadingOptions = {}) => {
    const {
      text = 'loading...',
      textColor = '#000',
      textSize = '14px',
      spinnerColor = '#000',
      backgroundColor = 'rgba(255, 255, 255, 0.8)',
    } = options

    // 创建容器元素
    const div = document.createElement('div')
    div.className = 'v-loading-container'

    // 为每个实例创建唯一的类名
    const uniqueId = `loading-${Date.now()}`
    div.classList.add(uniqueId)

    // 设置加载组件的 HTML 结构
    div.innerHTML = `
      <div class="v-loading-spinner">
        <div class="v-loading-circular"></div>
        <div class="v-loading-text">${text}</div>
      </div>
    `
    // 添加实例特定的样式
    const style = document.createElement('style')
    style.textContent = `
      .${uniqueId} {
        background: ${backgroundColor};
      }
      .${uniqueId} .v-loading-circular {
        border: 3px solid #f3f3f3;
        border-top: 3px solid ${spinnerColor};
      }
      .${uniqueId} .v-loading-text {
        color: ${textColor};
        font-size: ${textSize};
      }
    `
    document.head.appendChild(style)

    return div
  }

  /**
   * 向页面添加加载组件所需的样式
   * 只在客户端执行时添加，避免服务端渲染问题
   */
  const addBaseStyles = () => {
    const style = document.createElement('style')
    style.textContent = `
      /* 加载遮罩层容器 */
      .v-loading-container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;  /* 确保遮罩层在最上层 */
      }
      
      /* 加载动画容器 */
      .v-loading-spinner {
        text-align: center;
      }
      
      /* 圆形旋转动画 */
      .v-loading-circular {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        margin: 0 auto;
        animation: spin 1s linear infinite;
      }
      
      /* 加载文字样式 */
      .v-loading-text {
        margin-top: 8px;
      }
      
      /* 定义旋转动画 */
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `
    // 将样式添加到页面头部
    document.head.appendChild(style)
  }

  /**
   * 解析指令的值和配置
   * @param {any} binding - 指令绑定值
   * @returns {[boolean, LoadingOptions]} 返回加载状态和配置对象
   */
  const parseBinding = (binding: any): [boolean, LoadingOptions] => {
    let isLoading = false
    let options: LoadingOptions = {}

    // 处理布尔值情况
    if (typeof binding.value === 'boolean') {
      isLoading = binding.value
    }
    else if (typeof binding.value === 'object' && binding.value !== null) {
      // 处理对象情况
      options = { ...binding.value }
      isLoading = binding.value.show ?? true // 如果没有提供 show，默认为 true
    }

    return [isLoading, options]
  }

  // 注册自定义指令
  nuxtApp.vueApp.directive('loading', {
    /**
     * 在绑定元素的父组件及他自己的所有子节点都挂载完成后调用
     * @param {HTMLElement} el - 指令绑定的元素
     * @param {Object} binding - 指令绑定的值的相关信息 (v-loading="boolean" 中的 boolean)
     */
    mounted(el: HTMLElement, binding: any) {
      // 确保元素是可定位的，如果是 static 定位则修改为 relative
      if (getComputedStyle(el).position === 'static') {
        el.style.position = 'relative'
      }

      const [isLoading, options] = parseBinding(binding)

      // 如果绑定值为 true，添加加载组件
      if (isLoading) {
        const loadingComponent = createLoadingComponent(options)
        el.appendChild(loadingComponent)
        // 添加标记，用于判断加载组件是否已添加
        el.setAttribute('loading-added', 'true')
      }
    },

    /**
     * 在绑定元素的父组件及他自己的所有子节点都更新后调用
     * @param {HTMLElement} el - 指令绑定的元素
     * @param {Object} binding - 指令绑定的值的相关信息
     */
    updated(el: HTMLElement, binding: any) {
      // 获取加载组件状态标记
      const loadingAdded = el.getAttribute('loading-added')
      const [isLoading, options] = parseBinding(binding)

      if (isLoading) {
        // 需要显示加载状态，且未添加过加载组件
        if (!loadingAdded) {
          const loadingComponent = createLoadingComponent(options)
          el.appendChild(loadingComponent)
          el.setAttribute('loading-added', 'true')
        }
      }
      else {
        // 不需要显示加载状态，且已添加过加载组件
        if (loadingAdded) {
          const loadingComponent = el.querySelector('.v-loading-container')
          if (loadingComponent) {
            // 移除加载组件
            el.removeChild(loadingComponent)
          }
          el.removeAttribute('loading-added')
        }
      }
    },
  })

  // 仅在客户端添加样式
  if (import.meta.client) {
    addBaseStyles()
  }
})
