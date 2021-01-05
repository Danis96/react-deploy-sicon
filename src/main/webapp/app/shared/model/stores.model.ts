import { IMachines } from 'app/shared/model/machines.model';
import { IOwners } from 'app/shared/model/owners.model';

export interface IStores {
  id?: number;
  address?: string;
  machines?: IMachines[];
  ownerId?: IOwners;
}

export const defaultValue: Readonly<IStores> = {};
