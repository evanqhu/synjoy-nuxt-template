<script setup lang="ts">
const route = useRoute()
const router = useRouter()
</script>

<template>
  <div class="policies-header">
    <div class="header__back">
      <SvgIcon name="back" size="24" class="back-btn" @click="router.back()" />
    </div>
    <h1 class="header__title">
      {{ route.meta.title }}
    </h1>
  </div>
</template>

<style lang="scss" scoped>
.policies-header {
  position: fixed;
  width: 100%;
  height: $header-height;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  background: #fff;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);

  .header__back {
    display: flex;
    align-items: center;
    border-radius: 4px;
    @include hover-effect($bgc: rgba(0, 0, 0, 0.08));
  }

  .header__title {
    flex: 1;
    margin-right: 24px;
    text-align: center;
    font-size: 1.25rem;
    font-weight: 900;
  }

  // PC
  @media screen and (min-width: $device-point) {
    .header__back {
      padding: 0.25rem;
    }
    .header__title {
      margin-right: 32px;
    }
  }

  // > 1200px
  @media (min-width: $container-width) {
    padding: 0 calc((100% - $container-width) / 2);
  }
}
</style>
