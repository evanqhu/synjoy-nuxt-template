<script setup lang="ts">
const appStore = useAppStore()
const { webConfig } = appStore
const { getHref } = useCustomRouting()
</script>

<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__section">
        <h2 class="footer__section__title">
          ABOUT US
        </h2>
        <p class="footer__section__content">
          {{ webConfig.aboutUs }}
        </p>
      </div>

      <div class="footer__section resource">
        <h2 class="footer__section__title">
          RESOURCE
        </h2>
        <NuxtLink
          v-for="(item, index) in resourcesList"
          :key="index"
          :href="getHref(item.path)"
          class="footer__section__content"
        >
          {{ item.name }}
        </NuxtLink>
      </div>

      <div class="footer__section contact">
        <h2 class="footer__section__title">
          CONTACT US
        </h2>
        <a class="footer__section__content" :href="`mailto:${webConfig.webEmail}`">
          {{ webConfig.webEmail }}
        </a>
      </div>
    </div>

    <div class="footer__copyright">
      Copyright © {{ new Date().getFullYear() }} {{ webConfig.webUrl }}. All Rights Reserved.
    </div>
  </footer>
</template>

<style lang="scss" scoped>
$bg-color: #000;
$text-color: #fff;
$text-color-muted: #999;
$border-color: #666;
$pc-margin: calc((100% - $container-width) / 2);

.footer {
  background-color: $bg-color;
  color: $text-color;
  padding: 3rem $pc-margin 2rem;

  &__container {
    margin-bottom: 3rem;
    display: flex;
    justify-content: space-around;
  }

  &__section {
    max-width: calc(1 / 3 * 100%);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &__title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    &__content {
      color: $text-color-muted;
      line-height: 1.5;
    }
  }

  &__copyright {
    padding-top: 2rem;
    border-top: 1px solid $border-color;
    text-align: center;
    color: $text-color-muted;
  }

  .resource,
  .contact {
    .footer__section__content {
      @include hover($color: $text-color);
    }
  }

  .resource {
    .footer__section__content:not(:last-child) {
      margin-bottom: 1rem;
    }
  }

  // mobile
  @media screen and (max-width: $device-point) {
    padding: 0;

    &__container {
      flex-direction: column;
      align-items: center;
      margin-bottom: 0;
    }

    &__section {
      width: 100%;
      align-items: center;
      max-width: none;
      padding: 2rem;

      &__content {
        text-align: center;
      }

      &:not(:last-of-type) {
        border-bottom: 1px solid $border-color;
      }
    }

    &__copyright {
      padding-bottom: 2rem;
      font-size: 0.625rem;
    }
  }
}
</style>
