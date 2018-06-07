import BaseModel from './baseModel';
import { User } from './user';

export class Participation extends BaseModel {
  id: number;
  event: number;
  user: User;
  standby: boolean;
  subscription_date: string;
  presence_duration_minutes: number;
  presence_status: string;

  get_verbose_status() {
    if (this.presence_status === 'I') {
      return 'Inconnu';
    }
    if (this.presence_status === 'A') {
      return 'Absent';
    }
    if (this.presence_status === 'P') {
      return 'Présent';
    }
    return '';
  }
}



