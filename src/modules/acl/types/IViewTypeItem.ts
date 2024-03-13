import {DataModelType} from '../enum/DataModelType.ts'
import {AclViewType} from '../enum/AclViewType.ts'

export interface IViewTypeItem {
  viewType: AclViewType,
  title: string,
  usedDataModels: DataModelType[]
}