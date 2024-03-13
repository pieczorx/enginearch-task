<script setup lang="ts">
import {viewTypeItems} from '../constants/viewTypeItems'
import InputComponent from '../../ui/components/InputComponent.vue'
import {AclViewType} from '../enum/AclViewType'
import CheckboxItemComponent from '../../ui/components/CheckboxItemComponent.vue'
import ContainerComponent from '../../ui/components/ContainerComponent.vue'

interface Props {
  selectedViewTypes: AclViewType[]
}
const props = defineProps<Props>()

interface Emits {
  (event: 'update:selectedViewTypes', value: AclViewType[]): void
}
const emit = defineEmits<Emits>()

let selectedViewTypes = $computed<AclViewType[]>({
  get() {
    return props.selectedViewTypes
  },
  set(value: AclViewType[]) {
    emit('update:selectedViewTypes', value)
  }
})

function toggleSelectedViewType(viewType: AclViewType) {
  if(selectedViewTypes.includes(viewType)) {
    selectedViewTypes = selectedViewTypes.filter((type) => viewType !== type)
  } else {
    selectedViewTypes = [...selectedViewTypes, viewType]
  }
}

const search = $ref('')

const filteredViewTypeItems = $computed(() => {
  return viewTypeItems.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
})
</script>


<template>
  <ContainerComponent class="acl-sidebar">
    <div class="header">
      New role
    </div>
    <div class="title add-description">Add description (optional)</div>
      <InputComponent placeholder="Search view" v-model="search"/>
    <div class="title">Select views to add to that role</div>
    <div class="inside-content-wrapper">
      <CheckboxItemComponent
        v-for="item in filteredViewTypeItems"
        :key="item.viewType"
        :isChecked="selectedViewTypes.includes(item.viewType)"
        @click="toggleSelectedViewType(item.viewType)"
      >
        {{item.title}}
      </CheckboxItemComponent>
    </div>
  </ContainerComponent>
</template>


<style scoped lang="scss">
  .header {
    font-size: 22px;
    font-weight: 700;
  }

  .add-description {
    color: var(--text-color-secondary);
  }

  .acl-sidebar {
    display: grid;
    gap: 8px;
    align-content: flex-start;
  }

  .inside-content-wrapper {
    padding: 0 16px;
  }
</style>