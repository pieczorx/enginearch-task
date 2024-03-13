import {IActionTypeItem} from '../types/IActionTypeItem'
import {ActionType} from '../enum/ActionType'

export const actionTypeItems: IActionTypeItem[] = [
  {
    actionType: ActionType.Create,
    title: 'Create',
    color: '#6FCF97'
  },
  {
    actionType: ActionType.Read,
    title: 'Read',
    color: '#B5B9BB'
  },
  {
    actionType: ActionType.Update,
    title: 'Update',
    color: '#F2C94C'
  },
  {
    actionType: ActionType.Remove,
    title: 'Remove',
    color: '#EB5757'
  },
  {
    actionType: ActionType.DoSomeMagic,
    title: 'DoSomeMagic',
    color: '#326295'
  }
]