import { Component, OnInit, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router, Route } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Event } from '../../../models/event'
import { EventService} from '../../../services/event.service';
import {ResponseApi} from '../../../models/api';
import {TaskType} from '../../../models/taskType';
import {TasktypeService} from '../../../services/tasktype.service';


import {Pipe, PipeTransform} from '@angular/core';
import {invalidPipeArgumentError} from '@angular/common/esm2015/src/pipes/invalid_pipe_argument_error';

// /home/vardane/front_volontaria/Website-Volontaria/node_modules/@angular/common/esm2015/src/pipes/invalid_pipe_argument_error.js
// node_modules/@angular/common/esm2015/src/pipes/invalid_pipe_argument_error.js



@Component({
  selector: 'app-admin-event-details',
  templateUrl: './admin-event-details.component.html',
  styleUrls: ['./admin-event-details.component.scss']
})
export class AdminEventDetailsComponent implements OnInit {

  loading: boolean = true;
  // an_event$: Event = {} as Event;
  an_event$!: Observable<Event>;
  // an_event$: any;

  tasktypeList: TaskType[];
  tasktypeList$: Observable<TaskType[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private tasktypeService: TasktypeService) { }


  ngOnInit(): void {
    // see https://angular.io/guide/router-tutorial-toh#define-a-wildcard-route
    this.an_event$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.eventService.getById(Number(params.get('id')!)))
    );

    // this.activatedRoute.params.subscribe((params: Params) => {
    //     this.an_event$.id
    //   this.cellId = params['cellId'];
      // this.getParticipations();
      // this.changeSelectedDate(this.selectedDate);
      // this.changeCurrentMonth(this.actualMonth);
    // });
    // this.getTaskTypeList();
  }

  gotoEvents(an_event: Event) {
    const eventId = an_event ? an_event.id : null;
    // Pass along the event id if available
    // so that the EventList component can select that event.
    // Include a junk 'foo' property for fun.
    this.router.navigate(['/admin-events', { id: eventId, foo: 'foo' }]);
  }


// TODO: restrict list of tasks to task matching the event being examined
// getTaskTypeList(): void {
//   this.tasktypeList$ = this.tasktypeService.list().pipe(
//     map((responseApi: ResponseApi<TaskType>) => {
//       return responseApi.results;
//     })
//   );
//   this.tasktypeList$.subscribe((tasktypes: TaskType[]) => {
//     this.tasktypeList = tasktypes;
//   });
// }

// inspired from 
// https://github.com/angular/angular/blob/a92a89b0eb127a59d7e071502b5850e57618ec2d/packages/common/src/pipes/case_conversion_pipes.ts

}

