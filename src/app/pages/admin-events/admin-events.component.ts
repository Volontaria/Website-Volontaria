import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
// import {map} from 'rxjs/operators';
import {ResponseApi} from '../../models/api';
import {EventService} from '../../services/event.service';
import {Event} from '../../models/event';
import {SearchField} from "../../models/search-field";
// import {CkeditorPage} from "../../models/ckeditorPage";
import {MatTableDataSource} from '@angular/material/table';
import {Observable} from 'rxjs/internal/Observable';
import {Router} from "@angular/router";
// import {ActivatedRoute, Params} from '@angular/router';
import { MatPaginator} from '@angular/material/paginator';


// temp:
// import { ADMIN_EVENTS } from '../../mock-admin-events';


@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.scss']
})
export class AdminEventsComponent implements OnInit, AfterViewInit {

  eventList$: Observable<Event[]>; 
  
  // eventList: MatTableDataSource<Event>;
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

  // For paginator, courtesy https://stackoverflow.com/questions/66839002/how-to-add-pagination-in-angular-material-table-that-bind-to-api-response
  // see also https://v10.material.angular.io/components/table/overview#pagination
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit(): void {
    this.eventList.paginator = this.paginator;
  }


  // Filter
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
