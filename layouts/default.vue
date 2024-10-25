<!-- 默认布局 -->
<template>
  <div class="default-layout">
    <h1 class="header">
      默认 layout
    </h1>
    <div class="app-content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.default-layout {
  width: 100%;
  height: 100%;
}

.header {
  height: 4rem;
  margin: 0;
  line-height: 4rem;
  text-align: center;
  border-bottom: 1px solid #ccc;
}

.app-content {
  padding: 1rem;
}
</style>
