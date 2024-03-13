import {DataModelType} from '../enum/DataModelType.ts'
import {ActionType} from '../enum/ActionType.ts'

export interface IDataModelTypeItem {
  dataModelType: DataModelType,
  title: string,
  availableActionTypes: ActionType[]
}
