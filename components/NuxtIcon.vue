<!-- eslint-disable vue/no-v-html -->
<template>
  <span
    class="nuxt-icon"
    :class="{ 'nuxt-icon--fill': !filled, 'nuxt-icon--stroke': hasStroke && !filled }"
    v-html="icon"
  />
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  name: string
  filled?: boolean
}>(), { filled: false })

// icon 的内容
const icon = ref<string | Record<string, unknown>>('')
// 是否包含 stroke
let hasStroke = false

async function getIcon() {
  try {
    // 动态导入 icons 文件夹下的所有 svg 文件
    const iconsImport = import.meta.glob('assets/icons/**/**.svg', {
      eager: false,
      query: '?raw',
      import: 'default',
    }) as Record<string, () => Promise<string>>

    const rawIcon = await iconsImport[`/assets/icons/${props.name}.svg`]()

    if (rawIcon.includes('stroke')) {
      hasStroke = true
    }
    icon.value = rawIcon
  }
  catch {
    console.error(
      `[nuxt-icons] Icon '${props.name}' doesn't exist in 'assets/icons'`,
    )
  }
}

await getIcon()

watchEffect(getIcon)
</script>

<style>
.nuxt-icon svg {
  width: 1rem;
  height: 1rem;
  margin-bottom: 0.125em;
  vertical-align: middle;
}
.nuxt-icon.nuxt-icon--fill,
.nuxt-icon.nuxt-icon--fill * {
  fill: currentColor !important;
}

.nuxt-icon.nuxt-icon--stroke,
.nuxt-icon.nuxt-icon--stroke *{
  stroke: currentColor !important;
}
</style>
