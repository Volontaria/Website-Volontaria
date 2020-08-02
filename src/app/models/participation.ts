import { BaseModel } from './base-model';
import { Event } from './event';
import { Deserializable } from './deserializable';
import * as moment from 'moment';

export class Participation extends BaseModel implements Deserializable {
  public id?: number;
  public url?: string;
  public event: Event;
  public user: any;

  // tslint:disable-next-line:variable-name
  public presence_duration_minutes?: number;

  // tslint:disable-next-line:variable-name
  public presence_status?: boolean;

  // tslint:disable-next-line:variable-name
  public is_standby?: boolean;

  // tslint:disable-next-line:variable-name
  public registered_at?: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    if (input.event && typeof input.event !== 'string') {
      this.event = new Event().deserialize(input.event);
    }
    return this;
  }

  get activityName(): string {
    return this.event.task_type.name;
  }

  get type(): string {
    if (this.is_standby) {
      return 'Remplacant';
    } else {
      return 'Bénévole';
    }
  }

  get readableStartDate(): string {
    return this.event.readableStartDate;
  }

  get readableStartTime(): string {
    return this.event.readableStartTime;
  }

  get readableEndTime(): string {
    return this.event.readableEndTime;
  }

  get placeName(): string {
    return this.event.cell.name;
  }

  get addressLines(): string {
    let address = this.event.cell.address_line_1;
    if (this.event.cell.address_line_2) {
      address += this.event.cell.address_line_2;
    }
    return address;
  }

  get readableDuration(): string {
    return this.event.readableDuration;
  }
}
