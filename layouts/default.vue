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
// header 高度
$header-height: 4rem;

.default-layout {
  width: 100%;
  height: 100%;
}

.header {
  height: $header-height;
  margin: 0;
  line-height: $header-height;
  text-align: center;
  border-bottom: 1px solid #ccc;
}

.app-content {
  padding: 1rem;
}
</style>
