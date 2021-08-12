import { Component, Input, OnInit } from '@angular/core';
// import {map} from 'rxjs/operators';
import {ResponseApi} from '../../models/api';
import {EventService} from '../../services/event.service';
import {Event} from '../../models/event';
import {SearchField} from "../../models/search-field";
// import {CkeditorPage} from "../../models/ckeditorPage";
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

  _description: string;
  get description(): string {
    return this._description;
  }

  @Input('description')
  set description(value: string) {
    this._description = value;
    this.searchEvents();
  }

  constructor(private eventService: EventService,
              private router: Router,
              // private activatedRoute: ActivatedRoute
              ) { }

  ngOnInit(): void {
    this.getEvents();
    this.searchEvents();

  }

  getEvents(): void {
    this.eventService.list().subscribe(
      (responseApi: ResponseApi<Event>) => {
        this.eventList = new MatTableDataSource(responseApi.results);
    })
  }

  searchEvents(): void {
    const searchField: SearchField = {
      description: this.description
    }
    this.eventService.search(searchField).subscribe(
      (responseApi: ResponseApi<Event>) => {
        this.eventList = new MatTableDataSource(responseApi.results);
    });
  } 
}
