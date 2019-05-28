import BaseModel from './baseModel';
import { Cell } from './cell';

export class Coupon extends BaseModel {
  code: string;
  balance: string;
}

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
  coupon: Coupon;
}

export class AdminUser extends User {
  volunteer_note: string;
  last_participation: Date;
}
