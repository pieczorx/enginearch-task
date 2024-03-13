<script lang="ts">
export default {
  setup() {
    return {

    }
  },
}
</script>

<template>
  <div class="container">
    <slot/>
  </div>
</template>

<style scoped lang="scss">
  .container {
    background: var(--white);
    padding: 24px;
    box-sizing: border-box;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.08), 0px 2px 6px 0px rgba(0, 0, 0, 0.16);
    border-radius: 8px;
  }
</style>
