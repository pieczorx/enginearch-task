<script setup lang="ts">
    import {IActionTypeItem} from '../types/IActionTypeItem.ts'
    import DropdownComponent from '../../ui/components/DropdownComponent.vue'
    import ActionComponent from './ActionComponent.vue'
    import {ActionType} from '../enum/ActionType.ts'

    interface Props {
        actionTypeItems: IActionTypeItem[]
    }
    const props = defineProps<Props>()

    interface Emits {
        (e: 'toggleAction', actionType: ActionType): void
    }
    const emit = defineEmits<Emits>()

    function toggleAction(actionType: ActionType) {
        emit('toggleAction', actionType)
    }
</script>

<template>
    <div class="empty" v-if="!actionTypeItems.length">
        -
    </div>
    <DropdownComponent v-else-if="actionTypeItems.length >= 3">
        <div class="more-items">{{actionTypeItems.length}}</div>
        <template #dropdown>
            <div class="actions">
                <ActionComponent
                        v-for="actionTypeItem in actionTypeItems"
                        :key="actionTypeItem.actionType"
                        :color="actionTypeItem.color"
                        @click="toggleAction(actionTypeItem.actionType)"
                >
                    {{actionTypeItem.title}}
                </ActionComponent>
            </div>
        </template>
    </DropdownComponent>
    <div class="actions" v-else>
        <ActionComponent
                v-for="actionTypeItem in actionTypeItems"
                :key="actionTypeItem.actionType"
                :color="actionTypeItem.color"
                @click="toggleAction(actionTypeItem.actionType)"
        >
            {{actionTypeItem.title}}
        </ActionComponent>
    </div>
</template>

<style scoped lang="scss">
  .actions {
    display: grid;
    align-content: flex-start;
    padding: 8px;
    gap: 4px;
    user-select: none;
  }

  .more-items {
    border-radius: 4px;
    border: 1px solid #3A76A5;
    padding: 0 8px;
    box-sizing: border-box;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }
</style>