import BaseModel from "./baseModel";

export class User extends BaseModel {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  mobile: string;
}


