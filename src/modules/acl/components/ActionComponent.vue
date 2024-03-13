<script setup lang="ts">
interface Props {
    color: string
}
const props = defineProps<Props>()

const color = $computed(() => {
    return props.color
})
</script>

<template>
  <div class="action">
    <slot/>
  </div>
</template>

<style scoped lang="scss">
.action {
  border-radius: 4px;
  background: v-bind(color);
  padding: 0 12px;
  cursor: pointer;
  text-align: center;
}
</style>