import BaseModel from "./baseModel";
import {User} from "./user";
import {Event} from "./event";

export class Participation extends BaseModel {
  id: number;
  event: number;
  user: User;
  standby: boolean;
  subscription_date: string;
}



