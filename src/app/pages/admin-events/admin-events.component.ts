import { Component, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';
import {ResponseApi} from '../../models/api';
import {AdminEventService} from '../../services/admin-event.service';
import {Event} from '../../models/event';
import {MatTableDataSource} from '@angular/material/table';
import {Observable} from 'rxjs/internal/Observable';
import {Router} from "@angular/router";

// temp:
import { ADMIN_EVENTS } from '../../mock-admin-events';


@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.scss']
})
export class AdminEventsComponent implements OnInit {
  eventList$: Observable<Event[]>;
  
  
  // eventList: MatTableDataSource<Event>;
  eventList = ADMIN_EVENTS;

  displayedColumns: string[] = [
    'description',
    'start_time',
    'end_time',
    // 'volunteers',
    // 'volunteers_needed',
    // 'standby',
    // 'standby_needed',
    'cell',
    'task_type'
  ];

  ngOnInit(): void{
    
  }

  constructor(private adminEventService: AdminEventService,
              private router: Router) { }

  // TODO: make the below work            
  // ngOnInit(): void {
  //   this.getEvents();
  // }

  // getEvents(): void {
  //   this.eventList$ = this.adminEventService.list().pipe(
  //     map((responseApi: ResponseApi<Event>) => {
  //       return responseApi.results;
  //     })
  //   );
  //   this.eventList$.subscribe((events: Event[]) => {
  //     // if ( events.length === 1) {
  //       this.router.navigate(['/admin-events/']); // or should this be events?
  //     // } else {
  //       this.eventList = new MatTableDataSource(events);
  //     // }
  //   });
  // }
}
