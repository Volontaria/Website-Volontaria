import BaseModel from './baseModel';
import { Address } from './address';
import { User } from './user';

export class Cell extends BaseModel {
  id: number;
  name: string;
  email: string;
  address: Address;
  managers: User;
}


