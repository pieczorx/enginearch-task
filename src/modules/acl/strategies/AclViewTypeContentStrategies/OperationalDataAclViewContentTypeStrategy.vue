<script setup lang="ts">
import {DataModelType} from '../../enum/DataModelType'
import DataModelItemComponent from '../../components/DataModelItemComponent.vue'
import {IActionTypesByDataModelTypeMap} from '../../types/IActionTypesByDataModelTypeMap.ts'
import {ActionType} from '../../enum/ActionType.ts'

interface Props {
  visibleModelTypes?: DataModelType[]
  enabledActionsByDataModelTypeMap: IActionTypesByDataModelTypeMap
}
const props = withDefaults(defineProps<Props>(), {
  visibleModelTypes() {
    return []
  }
})

interface Emits {
    (e: 'update:enabledActionsByDataModelTypeMap', map: IActionTypesByDataModelTypeMap): void
}
const emit = defineEmits<Emits>()

const mappedModelTypes = $computed(() => {
  return props.visibleModelTypes.map((dataModelType) => {
    return {
      dataModelType,
      enabledActions: props.enabledActionsByDataModelTypeMap.get(dataModelType) || []
    }
  })
})

let enabledActionsByDataModelTypeMapModel = $computed({
    get() {
        return props.enabledActionsByDataModelTypeMap
    },
    set(value: IActionTypesByDataModelTypeMap) {
        emit('update:enabledActionsByDataModelTypeMap', value)
    }
})

function toggleAction(dataModelType: DataModelType, action: ActionType) {
  const newMap = new Map(enabledActionsByDataModelTypeMapModel)
  const enabledActions = enabledActionsByDataModelTypeMapModel.get(dataModelType) || []
  if (enabledActions.includes(action)) {
    enabledActions.splice(enabledActions.indexOf(action), 1)
  } else {
    enabledActions.push(action)
  }
  newMap.set(dataModelType, enabledActions)
  enabledActionsByDataModelTypeMapModel = newMap
}
</script>


<template>
    <div class="data-model-items-wrapper" v-if="visibleModelTypes.length">
      <div class="data-model-items" >
          <DataModelItemComponent
            v-for="mappedModelType in mappedModelTypes"
            :key="mappedModelType.dataModelType"
            :dataModelType="mappedModelType.dataModelType"
            :enabledActions="mappedModelType.enabledActions"
            @toggleAction="toggleAction(mappedModelType.dataModelType, $event)"
        />
      </div>
    </div>

  <div class="empty" v-else>
    <div class="thumbnail">

    </div>
    <div class="title">Create new role</div>
    <div class="description">Start selecting Views to define<br/>access to Operational Data</div>
  </div>
</template>

<style scoped lang="scss">
  .empty {
    display: grid;
    grid-template-rows: repeat(3, auto);
    width: 100%;
    height: 100%;
    align-content: center;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 8px;
  }

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .description {
    font-size: 14px;
  }

  .data-model-items-wrapper {
    overflow-y: scroll;
    min-height: 0;
    height: 100%;
  }

  .data-model-items {
    display: grid;
    gap: 30px;
  }
</style>