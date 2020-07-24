import {Moment} from 'moment';

export class ICalendarDay {
  date: Moment;
  currentMonth: boolean;
}

export interface ICalendarRange {
  beginDate: Moment;
  endDate: Moment;
  label?: string;
}
