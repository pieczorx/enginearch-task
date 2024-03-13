<script setup lang="ts">
  import SegmentedItemsComponent from '../../components/SegmentedItemsComponent.vue'
  import {ISegmentedItem} from './types/ISegmentedItem.ts'
  import SegmentedItemComponent from '../../components/SegmentedItemComponent.vue'

interface Props {
  items: ISegmentedItem[]
  modelValue: string|number|symbol
}
const props = defineProps<Props>()

interface Emits {
  (eventName: 'update:modelValue', value: string|number|symbol): void
}
const emit = defineEmits<Emits>()

let currentItemId = $computed({
  get() {
    return props.modelValue
  },
  set(value: string|number|symbol) {
    emit('update:modelValue', value)
  }
})

function onItemClick(itemId: string|number|symbol) {
  currentItemId = itemId
}
</script>

<template>
  <SegmentedItemsComponent>
    <SegmentedItemComponent
      v-for="item in props.items"
      @click="onItemClick(item.id)"
      :isSelected="currentItemId === item.id"
    >
      {{item.title}}
    </SegmentedItemComponent>
  </SegmentedItemsComponent>
</template>