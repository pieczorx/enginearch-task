<script setup lang="ts">
  interface Props {
    placeholder?: string
    type?: string
    modelValue?: string
  }
const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  type: 'text',
  modelValue: '',
})

  interface Emits {
    (e: 'update:modelValue', value: string): void
  }
const emit = defineEmits<Emits>()

const valueModel = $computed({
  get() {
    return props.modelValue
  },
  set(value: string) {
    emit('update:modelValue', value)
  },
})
</script>

<template>
  <input
    v-model="valueModel"
    :type="props.type"
    :placeholder="props.placeholder"
  />
</template>

<style scoped lang="scss">
  input {
    border-radius: 8px;
    border: 1px solid var(--border-color-base);
    background: var(--input-bg);
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04);
    height: 36px;
    padding: 0 12px;
  }
</style>
