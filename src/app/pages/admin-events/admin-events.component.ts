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


import {ModalService} from '../../services/modal.service';



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
  event: any;

  displayedColumns: string[] = [
    'description',
    'start_time',
    'end_time',
    // 'volunteers',
    // 'volunteers_needed',
    // 'standby',
    // 'standby_needed',
    'cell',
    'task_type',
    'delete',
  ];

  // For paginator, courtesy https://stackoverflow.com/questions/66839002/how-to-add-pagination-in-angular-material-table-that-bind-to-api-response
  // see also https://v10.material.angular.io/components/table/overview#pagination
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  // resultsLength = 0;
  // isLoadingResults = true;
  // isRateLimitReached = false;

  createModalName: string;


  constructor(private eventService: EventService,
    private router: Router,
    // private activatedRoute: ActivatedRoute
    // private _httpClient: HttpClient
    private modalService: ModalService
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
      // this.getEventDetail(this.an_event);  
      // this.createModalName ='delete_event_' + params.get('id');
      this.createModalName = 'create_event'
    }


  
    getEvents(): void {
      this.eventService.list().subscribe(
        (responseApi: ResponseApi<Event>) => {
          this.eventList = new MatTableDataSource(responseApi.results);
      })
    }

    // createEvent(): void{
    //   this.eventService.post(this).subscribe(

    //   )
    // }



    openCreationModal(): void {

      this.modalService.get(this.createModalName).close();

    }

 
    // Delete selected event
    // https://angularquestions.com/2021/03/08/how-to-remove-a-row-from-an-angular-material-table/






    // see https://stackoverflow.com/questions/54744770/how-to-delete-particular-row-from-angular-material-table-which-doesnt-have-filte#55564456

    // deleteEvent(rowid: number) {
    //   if (rowid > -1) {
    //     this.eventList.splice(rowid, 1)
    //   }
    // }
  
    // selectedEvent?: Event;
    // onSelect(event: Event): void {
    //   this.selectedEvent = event;
    // }

    // ref https://careydevelopment.us/blog/angular-material-tables-how-to-make-clickable-rows-that-take-users-to-a-new-route
    // and then
    // https://stackoverflow.com/questions/68915846/how-to-fix-error-uncaught-in-promise-error-cannot-match-any-routes-when-clic/68916321#68916321

    getEventDetail(an_event: Event) {
      let route = '/admin-events/details/';
      this.router.navigate([route, an_event.id]);
    }

  }