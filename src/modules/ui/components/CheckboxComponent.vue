<script setup lang="ts">
  interface Props {
    isChecked?: boolean
  }
  const props = withDefaults(defineProps<Props>(), {
    isChecked: false
  })
</script>

<template>
  <div class="checkbox" :class="{'is-checked': props.isChecked}">

  </div>
</template>

<style scoped lang="scss">
  .checkbox {
    width: 16px;
    height: 16px;
    border: 1.5px solid var(--border-color-base);
    border-radius: 4px;
    filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.04));

    &.is-checked {
      background: var(--checkbox-checked-background);
      border-color: transparent;
    }
  }
</style>