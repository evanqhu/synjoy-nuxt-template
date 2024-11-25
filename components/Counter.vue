<script setup lang="ts">
defineOptions({
  name: 'CounterView',
})
const counter = useState('counter', () => Math.round(Math.random() * 1000))
</script>

<template>
  <div class="counter">
    Counter: {{ counter }}
    <button @click="counter++">
      +
    </button>
    <button @click="counter--">
      -
    </button>
  </div>
</template>

<style lang="scss" scoped>
.counter {
  display: flex;
  align-items: center;
  gap: 2rem;
}
</style>
