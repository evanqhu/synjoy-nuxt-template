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
  const sizeValue = typeof props.size === 'number' ? `${props.size}px` : props.size

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
