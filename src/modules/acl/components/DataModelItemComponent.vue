<script setup lang="ts">
import {DataModelType} from '../enum/DataModelType.ts'
import {IDataModelTypeItem} from '../types/IDataModelTypeItem.ts'
import {dataModelTypeItems} from '../constants/dataModelTypeItems.ts'
import {ActionType} from '../enum/ActionType.ts'
import {IActionTypeItem} from '../types/IActionTypeItem.ts'
import {actionTypeItems} from '../constants/actionTypeItems.ts'
import ActionsComponent from './ActionsComponent.vue'

interface Props {
  dataModelType: DataModelType
  enabledActions: ActionType[]
}
const props = withDefaults(defineProps<Props>(), {

})

interface Emits {
  (e: 'toggleAction', actionType: ActionType): void
}
const emit = defineEmits<Emits>()

const titles = [
  'Data Model',
  'Remove',
  'Enabled actions',
  'Available actions',
  'Data scope',
]

const dataModelTypeItem = $computed<IDataModelTypeItem>(() => {
  return dataModelTypeItems.find((item) => item.dataModelType === props.dataModelType) as IDataModelTypeItem
})
function toggleAction(actionType: ActionType) {
  emit('toggleAction', actionType)
}

const allActionTypeItems = $computed<IActionTypeItem[]>(() => {
  return actionTypeItems.filter(actionTypeItem => {
    return dataModelTypeItem.availableActionTypes.includes(actionTypeItem.actionType)
  })
})

const enabledActionTypeItems = $computed<IActionTypeItem[]>(() => {
  return allActionTypeItems.filter(actionTypeItem => {
    return props.enabledActions.includes(actionTypeItem.actionType)
  })
})

const notEnabledActionTypeItems = $computed<IActionTypeItem[]>(() => {
  return allActionTypeItems.filter(actionTypeItem => {
    return !props.enabledActions.includes(actionTypeItem.actionType)
  })
})
</script>


<template>
  <div class="data-model-item">
    <div class="cell header" v-for="(title, i) in titles" :key="i">{{title}}</div>
    <div class="cell value">{{dataModelTypeItem.title}}</div>
    <div class="cell value editable">Not implemented</div>
    <div class="cell value editable">
      <ActionsComponent :actionTypeItems="enabledActionTypeItems" @toggleAction="toggleAction"/>
    </div>
    <div class="cell value editable actions">
      <ActionsComponent :actionTypeItems="notEnabledActionTypeItems" @toggleAction="toggleAction"/>
    </div>
    <div class="cell value editable">Not implemented</div>
  </div>
</template>

<style scoped lang="scss">
  .data-model-item {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 48px 128px;
    gap: 2px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.08), 0px 2px 6px 0px rgba(0, 0, 0, 0.16);
  }

  .cell {
    background: #F8F8F8;
    display: flex;
    align-items: center;
    justify-content: center;

    &.header {
      font-weight: 600;
      font-size: 14px;
    }

    &.editable {
      background: #fff;
    }
  }
</style>
