<script setup lang="ts">
import SegmentedItemsContainer from '../modules/ui/containers/SegmentedItemsContainer/SegmentedItemsContainer.vue'
import ContainerComponent from '../modules/acl/components/ContainerComponent.vue'
import {AclSettingsViewType} from '../modules/acl/enum/AclSettingsViewType.ts'
import AclViewTypeContentFactory from '../modules/acl/factories/AclViewTypeContentFactory.vue'
import InputComponent from '../modules/ui/components/InputComponent.vue'
import AclSidebarComponent from '../modules/acl/components/AclSidebarComponent.vue'
import {AclViewType} from '../modules/acl/enum/AclViewType.ts'
import {viewTypeItems} from '../modules/acl/constants/viewTypeItems.ts'
import {DataModelType} from '../modules/acl/enum/DataModelType.ts'
import {IActionTypesByDataModelTypeMap} from '../modules/acl/types/IActionTypesByDataModelTypeMap.ts'
import {IDataModelTypeItem} from '../modules/acl/types/IDataModelTypeItem.ts'
import {dataModelTypeItems} from '../modules/acl/constants/dataModelTypeItems.ts'

const segmentedItems = [
  {
    id: AclSettingsViewType.OperationalData,
    title: 'Operational Data'
  },
  {
    id: AclSettingsViewType.StandardLibrary,
    title: 'Standard Library'
  },
]

const currentAclViewType = $ref(AclSettingsViewType.OperationalData)

let selectedViewTypes = $ref<AclViewType[]>([])

const selectedViewTypeItems = $computed(() => {
  return viewTypeItems.filter((item) => selectedViewTypes.includes(item.viewType))
})
const visibleModelTypes = $computed<DataModelType[]>(() => {
    const allVisibleModelTypes = selectedViewTypeItems.map(selectedViewTypeItem => {
        return selectedViewTypeItem.usedDataModels
    }).flat()
    // make unique
  return Array.from(new Set(allVisibleModelTypes))
})

const enabledActionsByDataModelTypeMap = $ref<IActionTypesByDataModelTypeMap>(new Map())

const search = $ref('')

const visibleModelItems = $computed<IDataModelTypeItem[]>(() => {
    return visibleModelTypes.map(modelType => {
        return dataModelTypeItems.find((item) => item.dataModelType === modelType)
    })
})
const filteredVisibleModelTypes = $computed<DataModelType[]>(() => {
  return visibleModelItems.filter((item) => {
      return item.title.toLowerCase().includes(search.toLowerCase())
  }).map(item => {
      return item.dataModelType
  })
})
</script>

<template>
  <div class="role-configuration-page">
    <AclSidebarComponent v-model:selectedViewTypes="selectedViewTypes"/>
    <div class="views-wrapper">
      <div class="view-header">
        <SegmentedItemsContainer :items="segmentedItems" v-model="currentAclViewType" />
        <InputComponent placeholder="Search view" v-model="search"/>
      </div>
      <div class="view-content">
        <AclViewTypeContentFactory
            :aclViewType="currentAclViewType"
            :visibleModelTypes="filteredVisibleModelTypes"
            v-model:enabledActionsByDataModelTypeMap="enabledActionsByDataModelTypeMap"
        />
      </div>

    </div>
  </div>
</template>


<style scoped lang="scss">
  .role-configuration-page {
    display: grid;
    grid-template-columns: 400px 1fr;
    grid-template-rows: 1fr;
    height: 100%;
    gap: 32px;
    box-sizing: border-box;
    padding: 48px;
    min-height: 0;
  }

  .view-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .views-wrapper {
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 32px;
    min-height: 0;
  }

  .view-content {
    height: 100%;
    min-height: 0;
  }
</style>