import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Event } from '../../../models/event';
import {ICalendarDay} from "./event-calendar-models";

@Component({
  selector: 'app-event-calendar',
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.scss']
})
export class EventCalendarComponent implements OnInit {

  @Output() changeCurrentMonth: EventEmitter<Moment> = new EventEmitter<Moment>();
  currentDate: Moment;

  @Output() changeSelectedDate: EventEmitter<Moment> = new EventEmitter<Moment>();
  selectedDate: Moment;

  @Input() events: Event[];

  calendar: ICalendarDay[];

  YEARS = [
    2020,
    2021,
    2022,
  ];

  MONTHS = [
    {
      name: 'JAN',
      id: 0,
    },
    {
      name: 'FEV',
      id: 1,
    },
    {
      name: 'MAR',
      id: 2,
    },
    {
      name: 'AVR',
      id: 3,
    },
    {
      name: 'MAI',
      id: 4,
    },
    {
      name: 'JUI',
      id: 5,
    },
    {
      name: 'JUI',
      id: 6,
    },
    {
      name: 'AOU',
      id: 7,
    },
    {
      name: 'SEP',
      id: 8,
    },
    {
      name: 'OCT',
      id: 9,
    },
    {
      name: 'NOV',
      id: 10,
    },
    {
      name: 'DEC',
      id: 11,
    },
  ];

  DAYS = [
    {
      name: 'DIMANCHE',
      id: 0,
    },
    {
      name: 'LUNDI',
      id: 1,
    },
    {
      name: 'MARDI',
      id: 2,
    },
    {
      name: 'MERCREDI',
      id: 3,
    },
    {
      name: 'JEUDI',
      id: 4,
    },
    {
      name: 'VENDREDI',
      id: 5,
    },
    {
      name: 'SAMEDI',
      id: 6,
    },
  ];

  constructor() {
    this.currentDate = moment();
  }

  ngOnInit(): void {
    this.selectedDate = this.currentDate.clone();
    this.initCalendarData();
  }

  newSelectDate(calendarDay: ICalendarDay): void {
    this.selectedDate = calendarDay.date;
    this.changeSelectedDate.emit(this.selectedDate);
  }

  isSelectedDate(day: Moment): boolean {
    return day.isSame(this.selectedDate, 'day');
  }

  isSelectedDay(day: number): boolean {
    if (this.selectedDate.isSame(this.currentDate, 'month')) {
      return this.selectedDate.day() === day;
    }
  }

  isSelectedMonth(month: number): boolean {
    return this.currentDate.month() === month;
  }

  isSelectedYear(year: number): boolean {
    return this.currentDate.year() === year;
  }

  private initCalendarData(): void {
    const firstDay: Moment = this.currentDate.clone().startOf('month');
    this.calendar = [];

    this.initDaysBeforeMonth(firstDay);
    this.initDaysMonth(firstDay);
  }

  private initDaysMonth(firstDay: Moment): void {
    const numberOfDays: number = firstDay.daysInMonth();
    for (let i = 0; i < numberOfDays; i++) {
      this.addDayToCalendar({
        currentMonth: true,
        date: firstDay.clone().add(i, 'days')
      });
    }
  }

  private initDaysBeforeMonth(firstDay: Moment): void {
    const firstDayForReverse: Moment = firstDay.clone();
    const offsetWeekIndex: number = firstDay.day();
    for (let i = offsetWeekIndex; i > 0; i--) {
      this.addDayToCalendar({
        currentMonth: false,
        date: firstDayForReverse.clone().subtract(i, 'days')
      });
    }
  }

  private addDayToCalendar(calendarDay: ICalendarDay): void {
    this.calendar.push(calendarDay);
  }

  changeMonth(month: number): void  {
    this.currentDate.month(month);
    this.initCalendarData();
    this.changeCurrentMonth.emit(this.currentDate.startOf('month'));
  }

  changeYear(year: number): void {
    this.currentDate.year(year);
    this.initCalendarData();
    this.changeCurrentMonth.emit(this.currentDate.startOf('month'));
  }

  isFilledDate(date: moment.Moment): boolean {
    for (const event of this.events) {
      if (date.isSame(moment(event.start_time), 'day')) {
         return true;
      }
    }
    return false;
  }
}
