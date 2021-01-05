import { IStores } from 'app/shared/model/stores.model';

export interface IMachines {
  id?: number;
  company?: string;
  type?: string;
  yearOfProduction?: number;
  importDate?: number;
  remarks?: string;
  warrantyStartDate?: number;
  warrantyEndDate?: number;
  deliveryNote?: string;
  serialNumber?: string;
  buyer?: string;
  storeId?: IStores;
}

export const defaultValue: Readonly<IMachines> = {};
