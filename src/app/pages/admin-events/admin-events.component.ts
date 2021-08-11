import { Component, OnInit } from '@angular/core';
// import {map} from 'rxjs/operators';
import {ResponseApi} from '../../models/api';
import {EventService} from '../../services/event.service';
import {Event} from '../../models/event';
import {MatTableDataSource} from '@angular/material/table';
import {Observable} from 'rxjs/internal/Observable';
import {Router} from "@angular/router";
import {ActivatedRoute, Params} from '@angular/router';


// temp:
// import { ADMIN_EVENTS } from '../../mock-admin-events';


@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.scss']
})
export class AdminEventsComponent implements OnInit {
  eventList$: Observable<Event[]>;
  
  
  eventList: MatTableDataSource<Event>;
  // eventList = ADMIN_EVENTS;

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

  // ngOnInit(): void{
    
  // }

  constructor(private eventService: EventService,
              private router: Router,
              private activatedRoute: ActivatedRoute
              ) { }

  // TODO: make the below work            
  ngOnInit(): void {
    this.getEvents();
    this.searchEvents();

  }

  getEvents(): void {
    this.eventService.list().subscribe(
      (responseApi: ResponseApi<Event>) => {
        this.eventList = new MatTableDataSource(responseApi.results);
    });


  searchEvents(): void {
    const search: SearchField = {
      description: this.description
    }
    this.eventService.search(search).subscribe(
      (responseApi: ResponseApi<Event>) => {
        this.eventList = new MatTableDataSource(responseApi.results);
    });
  }


  
  // get readableDate(this.eventList): string {
  //     return this.eventList.end_time.locale('fr').format('LL');
  //   }
  
  }
}
