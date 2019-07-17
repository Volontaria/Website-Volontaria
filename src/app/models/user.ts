import BaseModel from './baseModel';
import { Cell } from './cell';

export class User extends BaseModel {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  mobile: string;
  is_active: boolean;
  is_superuser: boolean;
  managed_cell: Cell[];
}

export class AdminUser extends User {
  last_participation: Date;
}
