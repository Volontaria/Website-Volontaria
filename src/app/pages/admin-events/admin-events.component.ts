import { Component, OnInit } from '@angular/core';
// import {AdminEventService} from '../../services/admin-event.service';
import { AdminEvent } from '../../models/admin-event';
import { ADMIN_EVENTS } from '../../mock-admin-events'; 

// For the below, see https://v10.material.angular.io/components/table/examples
@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.scss']
})
export class AdminEventsComponent {
  displayedColumns: string[] = [
    'description',
    'start_time',
    'end_time',
    // 'volunteers',
    // 'standby',
    // 'cell',
    // 'tasktype'
  ];
  dataSource = ADMIN_EVENTS;

  // constructor(private adminEventService: AdminEventService){
    
  // }

   
}

//   constructor() {}

  // ngOnInit() {
  // }


// export class AdminEventsComponent implements OnInit {

//   admin_events = ADMIN_EVENTS;
  
  // adminEvent: AdminEvent = {
  //   id: 1,
  //   url: "a-preciser",
  //   description: "collecte chaussures",
  //   start_time: "2021-08-07 12:00:00",
  //   end_time: "2021-08-07 18:00:00",
  //   nb_volunteers_needed: 2,
  //   nb_volunteers_standby_needed: 0,
  //   nb_volunteers: 0,
  //   nb_volunteers_standby: 0,
    // cell: "église saint-denis",
    // task_type: "trier"
  // };

//   constructor() {}

//   ngOnInit() {
//   }

// }



// import {EventService} from '../../services/event.service';


// import * as moment from 'moment';
// import {map} from 'rxjs/operators';
// import {ResponseApi} from '../../models/api';
// import {Event} from '../../models/event';
// import {Observable} from 'rxjs/internal/Observable';
// import {TaskType} from '../../models/taskType';
// import {TasktypeService} from '../../services/tasktype.service';
// import {Moment} from 'moment';
// import {ActivatedRoute, Params} from '@angular/router';
// import {Participation} from '../../models/participation';
// import {ParticipationService} from '../../services/participation.service';


  // events: Event[];
  // events$: Observable<Event[]>;

  // eventList: Event[];
  // eventList$: Observable<Event[]>;

  // #####
  
  // eventIndex = 0;
  // hoveredEvent;

  // selectedDate: Moment = moment();
  // actualMonth: Moment = moment().startOf('month');
  // cellId: number;

  // participationList: Participation[];
  // participationList$: Observable<Participation[]>;

  // eventDayList: Event[];
  // eventDayList$: Observable<Event[]>;

  // eventMonthList: Event[];
  // eventMonthList$: Observable<Event[]>;


  // tasktypeList: TaskType[];
  // tasktypeList$: Observable<TaskType[]>;
  // selectedTaskType: number[];

  // constructor(private adminEventService: AdminEventService,
              // private tasktypeService: TasktypeService,
              // private activatedRoute: ActivatedRoute,
              // private participationService: ParticipationService
              // ) { }

  // ngOnInit(): void {
    // this.activatedRoute.params.subscribe((params: Params) => {
    //   this.cellId = params['cellId'];
    //   this.getParticipations();
    //   this.changeSelectedDate(this.selectedDate);
    //   this.changeCurrentMonth(this.actualMonth);
    // });
    // this.getTaskTypeList();
  // }

  // getParticipations(): void {
  //   const searchField = {
  //     cell: this.cellId.toString()
  //   };
  //   this.participationList$ = this.participationService.search(searchField).pipe(
  //     map((responseApi: ResponseApi<Participation>) => {
  //       return responseApi.results;
  //     })
  //   );
  //   this.participationList$.subscribe((participations: Participation[]) => {
  //     this.participationList = participations;
  //   });
  // }

  // getEventList(): void {
  //   this.eventDayList = null;
  //   const endOfDay = this.selectedDate.clone().hours(23).minute(59).second(59);
  //   const searchField = {
  //     start_time__gte: this.selectedDate.toISOString(),
  //     end_time__lte: endOfDay.toISOString(),
  //     cell: this.cellId.toString()
  //   };
  //   this.eventDayList$ = this.eventService.search(searchField).pipe(
  //     map((responseApi: ResponseApi<Event>) => {
  //       return responseApi.results;
  //     })
  //   );
  //   this.eventDayList$.subscribe((events: Event[]) => {
  //     if (this.selectedTaskType === undefined || !this.selectedTaskType.length) {
  //       this.eventDayList = events;
  //     } else {
  //       this.eventDayList = [];
  //       for (const event of events) {
  //         for (const tasktype of this.selectedTaskType) {
  //           if (event.task_type.id === tasktype) {
  //             this.eventDayList.push(event);
  //           }
  //         }
  //       }
  //     }
  //   });
  // }

//   getTaskTypeList(): void {
//     this.tasktypeList$ = this.tasktypeService.list().pipe(
//       map((responseApi: ResponseApi<TaskType>) => {
//         return responseApi.results;
//       })
//     );
//     this.tasktypeList$.subscribe((tasktypes: TaskType[]) => {
//       this.tasktypeList = tasktypes;
//     });
//   }

//   previousEvent(): void {
//     if (this.eventIndex > 0) {
//       this.eventIndex -= 1;
//     }
//   }

//   nextEvent(): void {
//     if (this.eventIndex < this.eventDayList.length - 1) {
//       this.eventIndex += 1;
//     }
//   }

//   haveNext(): boolean {
//     if (this.eventDayList) {
//       return this.eventIndex !== this.eventDayList.length - 1;
//     } else {
//       return false;
//     }
//   }

//   havePrevious() {
//     if (this.eventDayList) {
//       return this.eventIndex !== 0;
//     } else {
//       return false;
//     }
//   }

//   changeHoverEvent(event): void {
//     this.hoveredEvent = event;
//   }

//   clearHoverEvent(): void {
//     this.hoveredEvent = null;
//   }

//   changeCurrentMonth(newBeginOfMonth): void {
//     this.actualMonth = newBeginOfMonth;
//     const endOfMonth = newBeginOfMonth.clone().endOf('month');
//     const searchField = {
//       start_time__gte: newBeginOfMonth.toISOString(),
//       end_time__lte: endOfMonth.toISOString(),
//       cell: this.cellId.toString()
//     };
//     this.eventMonthList$ = this.eventService.search(searchField).pipe(
//       map((responseApi: ResponseApi<Event>) => {
//         return responseApi.results;
//       })
//     );
//     this.eventMonthList$.subscribe((events: Event[]) => {
//       if (this.selectedTaskType === undefined || !this.selectedTaskType.length) {
//         this.eventMonthList = events;
//       } else {
//         this.eventMonthList = [];
//         for (const event of events) {
//           for (const tasktype of this.selectedTaskType) {
//             if (event.task_type.id === tasktype) {
//               this.eventMonthList.push(event);
//             }
//           }
//         }
//       }
//     });
//   }

//   changeSelectedDate(selectedDate): void {
//     this.eventIndex = 0;
//     this.selectedDate = selectedDate.startOf('day');
//     this.getEventList();
//   }

//   get readableSelectedDate(): string {
//     return this.selectedDate.locale('fr').format('LL');
//   }

//   refreshEvents(): void {
//     this.getEventList();
//     this.changeCurrentMonth(this.actualMonth);
//   }
// }
