<script setup lang="ts">
import type {Component} from 'vue'
import {AclSettingsViewType} from '../enum/AclSettingsViewType.ts'
import StandardLibraryAclViewTypeStrategy
  from '../strategies/AclViewTypeContentStrategies/StandardLibraryAclViewContentTypeStrategy.vue'
import OperationalDataAclViewTypeStrategy
  from '../strategies/AclViewTypeContentStrategies/OperationalDataAclViewContentTypeStrategy.vue'
import {DataModelType} from '../enum/DataModelType.ts'
import {IActionTypesByDataModelTypeMap} from '../types/IActionTypesByDataModelTypeMap.ts'

interface Props {
  aclViewType: AclSettingsViewType,
  visibleModelTypes: DataModelType[]
  enabledActionsByDataModelTypeMap: IActionTypesByDataModelTypeMap
}
const props = defineProps<Props>()

interface Emits {
  (e: 'update:enabledActionsByDataModelTypeMap', map: IActionTypesByDataModelTypeMap): void
}
const emit = defineEmits<Emits>()

const strategyMap = new Map<AclSettingsViewType, Component>([
  [AclSettingsViewType.StandardLibrary, StandardLibraryAclViewTypeStrategy],
  [AclSettingsViewType.OperationalData, OperationalDataAclViewTypeStrategy],
])
const strategyComponent = $computed(() => {
  return strategyMap.get(props.aclViewType)
})

const enabledActionsByDataModelTypeMapModel = $computed({
  get() {
    return props.enabledActionsByDataModelTypeMap
  },
  set(value: IActionTypesByDataModelTypeMap) {
    emit('update:enabledActionsByDataModelTypeMap', value)
  },
})
</script>

<template>
  <Component
    v-if="strategyComponent"
    :is="strategyComponent"
    :visibleModelTypes="props.visibleModelTypes"
    v-model:enabledActionsByDataModelTypeMap="enabledActionsByDataModelTypeMapModel"
  />
</template>
