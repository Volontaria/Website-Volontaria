import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
// import {map} from 'rxjs/operators';
import {ResponseApi} from '../../models/api';
import {EventService} from '../../services/event.service';
import {Event} from '../../models/event';
// import {SearchField} from "../../models/search-field";
// import {CkeditorPage} from "../../models/ckeditorPage";
import {MatTableDataSource} from '@angular/material/table';
// import {Observable} from 'rxjs/internal/Observable';
import {Router} from "@angular/router";
// import {ActivatedRoute, Params} from '@angular/router';
// import { MatPaginator} from '@angular/material/paginator';
// import {MatSort} from '@angular/material/sort';
// import {HttpClient} from '@angular/common/http';

// import {TaskType} from '../../models/taskType';
// import {Cell} from '../../models/cell';





// temp:
// import { ADMIN_EVENTS } from '../../mock-admin-events';


@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.scss']
})
export class AdminEventsComponent implements OnInit {

  // displayedColumns: string[] = ['created', 'state', 'number', 'title'];
  // exampleDatabase: ExampleHttpDatabase | null;
  // data: GithubIssue[] = [];

  eventList$: Observable<Event[]>;  
  eventList: MatTableDataSource<Event>;
  
  // clickedRows = new Set<Event>();
  event: Observable<Event>;

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
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  // resultsLength = 0;
  // isLoadingResults = true;
  // isRateLimitReached = false;

  constructor(private eventService: EventService,
    private router: Router,
    // private activatedRoute: ActivatedRoute
    // private _httpClient: HttpClient
    ) { }

  // ngAfterViewInit(): void {
  //   // this.eventList.paginator = this.paginator;
  //   this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);

  //   // If the user changes the sort order, reset back to the first page.
  //   this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

  //   merge(this.sort.sortChange, this.paginator.page)
  //     .pipe(
  //       startWith({}),
  //       switchMap(() => {
  //         this.isLoadingResults = true;
  //         return this.exampleDatabase!.getRepoIssues(
  //           this.sort.active, this.sort.direction, this.paginator.pageIndex);
  //       }),
  //       map(data => {
  //         // Flip flag to show that loading has finished.
  //         this.isLoadingResults = false;
  //         this.isRateLimitReached = false;
  //         this.resultsLength = data.total_count;

  //         return data.items;
  //       }),
  //       catchError(() => {
  //         this.isLoadingResults = false;
  //         // Catch if the GitHub API has reached its rate limit. Return empty data.
  //         this.isRateLimitReached = true;
  //         return observableOf([]);
  //       })
  //     ).subscribe(data => this.data = data);
  // }
  
  
      
    ngOnInit(): void {
      this.getEvents();
      // this.searchEvents();
  
    }
  
    getEvents(): void {
      this.eventService.list().subscribe(
        (responseApi: ResponseApi<Event>) => {
          this.eventList = new MatTableDataSource(responseApi.results);
      })
    }
  
    // selectedEvent?: Event;
    // onSelect(event: Event): void {
    //   this.selectedEvent = event;
    // }

    // ref https://careydevelopment.us/blog/angular-material-tables-how-to-make-clickable-rows-that-take-users-to-a-new-route
    getEventDetail(event: Event) {
      let route = '/admin-events/details/';
      this.router.navigate([route], { queryParams: { id: event.id } } );
    }

    // TODO: investigate why this error when clicking on a row in the event table:
    // ERROR Error: Uncaught (in promise): Error: Cannot match any routes. URL Segment: 'admin-events/details'
  
  }
  
  
    // export interface GithubApi {
    //   // items: GithubIssue[];
    //   // total_count: number;
    //   count: number;
    //   next: any;
    //   previous: any;
    //   results: Evnt[];
    // }

    // export interface ResponseApi<T> {
    //   count: number;
    //   next: any;
    //   previous: any;
    //   results: T[];
    // }

    // export interface Evnt{
    //     public id?: number;
    //     public url?: string;
    //     public description: string;
    //     public start_time: string;
    //     public end_time: string;
    //     public nb_volunteers_needed: number;
    //     public nb_volunteers_standby_needed: number;
    //     public nb_volunteers: number;
    //     public nb_volunteers_standby: number;
    //     public cell: Cell;
    //     public task_type: TaskType;
      
    // }
    
    // export interface GithubIssue {
    //   created_at: string;
    //   number: string;
    //   state: string;
    //   title: string;
    // }


    
    /** An example database that the data source uses to retrieve data for the table. */
  // export class ExampleHttpDatabase {
  //   constructor(private _httpClient: HttpClient) {}
  
  //   getRepoIssues(sort: string, order: string, page: number): Observable<GithubApi> {
  //     // const href = 'https://api.github.com/search/issues';
  //     const href = 'http://localhost:4200/admin-events/';
  //     const requestUrl =
  //         // `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${page + 1}`;
  //         `${href}?q=sort=${sort}&order=${order}&page=${page + 1}`;

  
  //     return this._httpClient.get<GithubApi>(requestUrl);
  //   }
  // }
  