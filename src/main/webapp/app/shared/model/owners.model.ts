import { IStores } from 'app/shared/model/stores.model';

export interface IOwners {
  id?: number;
  name?: string;
  address?: string;
  contactNumber?: number;
  contactPerson?: string;
  stores?: IStores[];
}

export const defaultValue: Readonly<IOwners> = {};
