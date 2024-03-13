<script setup lang="ts">
import CheckboxComponent from '../../ui/components/CheckboxComponent.vue'

interface Props {
  isChecked?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isChecked: false
})
</script>

<template>
  <div class="checkbox-item">
    <CheckboxComponent :isChecked="props.isChecked"/>
    <slot/>
  </div>
</template>

<style scoped lang="scss">
  .checkbox-item {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    gap: 4px;
    user-select: none;
    cursor: pointer;
  }
</style>