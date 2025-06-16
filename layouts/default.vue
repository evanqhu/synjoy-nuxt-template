<!-- 默认布局 -->
<template>
  <div class="w-full">
    <AppHeader />
    <main class="w-full h-full pt-header">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
