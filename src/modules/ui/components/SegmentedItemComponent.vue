<script setup lang="ts">
interface Props {
  isSelected?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  isSelected: false
})
</script>

<template>
  <div class="segmented-item" :class="{'is-selected': props.isSelected}">
    <slot/>
  </div>
</template>

<style scoped lang="scss">
  .segmented-item {
    border-radius: 8px;
    display: flex;
    padding: 2px;
    flex-shrink: 0;
    cursor: pointer;
    height: 36px;
    padding: 0 12px;
    align-items: center;

    &.is-selected {
      background: var(--segmented-selected-bg);
      box-shadow: 0px 1px 4px -1px rgba(0, 0, 0, 0.12), 0px 2px 8px -2px rgba(0, 0, 0, 0.08);
      font-weight: 700;

    }
  }
</style>
