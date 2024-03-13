<script lang="ts">

export default {

}
</script>

<template>
  <div class="segmented-items">
    <slot/>
  </div>
</template>

<style scoped lang="scss">
  .segmented-items {
    background: var(--segmented-bg);
    border-radius: 8px;
    display: flex;
    padding: 2px;
    flex-shrink: 0;
    user-select: none;
  }
</style>
