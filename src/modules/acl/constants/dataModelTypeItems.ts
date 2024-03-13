import {DataModelType} from '../enum/DataModelType'
import {ActionType} from '../enum/ActionType'
import {IDataModelTypeItem} from '../types/IDataModelTypeItem.ts'

export const dataModelTypeItems: IDataModelTypeItem[] = [
  {
    dataModelType: DataModelType.Shifts,
    title: 'Shifts',
    availableActionTypes: [
      ActionType.Create,
      ActionType.Read,
    ],
  },
  {
    dataModelType: DataModelType.ShiftJobs,
    title: 'Shift Jobs',
    availableActionTypes: [
      ActionType.Read,
    ],
  },
  {
    dataModelType: DataModelType.Vehicles,
    title: 'Vehicles',
    availableActionTypes: [
      ActionType.Create,
      ActionType.Read,
      ActionType.Remove,
      ActionType.Update,
      ActionType.DoSomeMagic,
    ],
  },
  {
    dataModelType: DataModelType.Drivers,
    title: 'Drivers',
    availableActionTypes: [
      ActionType.Create,
      ActionType.Read,
      ActionType.DoSomeMagic,
    ],
  },
  {
    dataModelType: DataModelType.Stadiums,
    title: 'Stadiums',
    availableActionTypes: [
      ActionType.Create,
      ActionType.Read,
      ActionType.Remove,
      ActionType.Update,
      ActionType.DoSomeMagic,
    ],
  },
]
