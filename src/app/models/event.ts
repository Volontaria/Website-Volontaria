import { BaseModel } from './base-model';
import {Deserializable} from './deserializable';
import {TaskType} from './taskType';
import {Cell} from './cell';
import * as moment from 'moment';

export class Event extends BaseModel implements Deserializable {
  public id?: number;
  public url?: string;
  public start_time: string;
  public end_time: string;
  public nb_volunteers_needed: number;
  public nb_volunteers_standby_needed: number;
  public nb_volunteers: number;
  public nb_volunteers_standby: number;
  public cell: Cell;
  public task_type: TaskType;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

  get readableStartDate(): string {
    const startTime = moment(this.start_time).locale('fr');
    return startTime.format('dddd') + ' ' + startTime.format('LL');
  }

  get readableStartTime(): string {
    const startTime = moment(this.start_time).locale('fr');
    return startTime.format('LT');
  }

  get isFull(): boolean {
    return this.isFullVolunteer && this.isFullVolunteerStandby;
  }

  get isFullVolunteerStandby(): boolean {
    return this.nb_volunteers_standby === this.nb_volunteers_standby_needed;
  }

  get isFullVolunteer(): boolean {
    return this.nb_volunteers === this.nb_volunteers_needed;
  }

  get readableEndTime(): string {
    const endTime = moment(this.end_time).locale('fr');
    return endTime.format('LT');
  }

  get readableDuration(): string {
    const startTime = moment(this.start_time);
    const endTime = moment(this.end_time);
    let minutes = startTime.diff(endTime, 'minute')
    const hours = startTime.diff(endTime, 'hour')
    minutes = minutes - hours * 60;

    let result = hours + 'H';
    if (minutes > 9) {
      result += minutes;
    } else if (minutes > 0) {
      result += '0' + minutes;
    }

    return result;
  }
}
