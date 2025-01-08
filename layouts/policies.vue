<!-- 法律 (政策) 布局 -->
<template>
  <div>
    <div class="policies-layout">
      <PoliciesHeader />
      <div class="app-main">
        <slot />
      </div>
      <BaseFooter />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.policies-layout {
  width: 100%;
  height: 100%;
}
</style>
