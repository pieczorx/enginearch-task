import {AclViewType} from '../enum/AclViewType'
import {DataModelType} from '../enum/DataModelType'
import {IViewTypeItem} from '../types/IViewTypeItem.ts'

export const viewTypeItems: IViewTypeItem[] = [
  {
    viewType: AclViewType.DispatcherScreen,
    title: 'Dispatcher Screen',
    usedDataModels: [
      DataModelType.Shifts,
      DataModelType.ShiftJobs,
    ],
  },
  {
    viewType: AclViewType.ShiftsManager,
    title: 'Shifts Manager',
    usedDataModels: [
      DataModelType.Shifts,
    ],
  },
  {
    viewType: AclViewType.LivePanel,
    title: 'Live Panel',
    usedDataModels: [
      DataModelType.Shifts,
      DataModelType.ShiftJobs,
      DataModelType.Vehicles,
      DataModelType.Drivers,
      DataModelType.Stadiums,
    ],
  },
  {
    viewType: AclViewType.ClientCommunicationMessages,
    title: 'Client Communication Messages',
    usedDataModels: [
      DataModelType.Drivers,
      DataModelType.Vehicles,
    ],
  },
  {
    viewType: AclViewType.SystemNotifications,
    title: 'System Notifications',
    usedDataModels: [
      DataModelType.Stadiums,
    ],
  },
]
