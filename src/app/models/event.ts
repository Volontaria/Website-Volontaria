import BaseModel from './baseModel';
import {Cell} from './cell';
import {Tasktype} from './tasktype';
import {Cycle} from './cycle';

export class Event extends BaseModel {
  id: number;
  task_type: Tasktype;
  cell: Cell;
  cycle: Cycle;
  start_date: string;
  end_date: string;
  volunteers: number[];
  volunteers_standby: number[];
  nb_volunteers: number;
  nb_volunteers_needed: number;
  nb_volunteers_standby: number;
  nb_volunteers_standby_needed: number;

  getStartTime() {
    const date = new Date(this.start_date);
    return date.toLocaleTimeString();
  }

  getEndTime() {
    const date = new Date(this.end_date);
    return date.toLocaleTimeString();
  }

  getVolunteersField() {
    return this.nb_volunteers + ' / ' + this.nb_volunteers_needed;
  }
  getStandByField() {
    return this.nb_volunteers_standby + ' / ' + this.nb_volunteers_standby_needed;
  }


}



