import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';



import {ApiRestGenericLibService} from './api-rest-generic-lib.service';
import {HttpClient} from '@angular/common/http';
import {Event} from '../models/event';

// import {HttpClient, HttpParams} from "@angular/common/http";
// import {Observable} from "rxjs";
// import {Course} from "../model/course";
import {map} from "rxjs/operators";
// import {Lesson} from "../model/lesson";


@Injectable({
    providedIn: 'root'
  })
  // export class AdminEventService {
    // EVENT_URL_BASE = `${this.apiUrl}/admin-events`;
  
  //   constructor(private http: HttpClient) {
  //   }

  //   getAllEvents(): Observable<Event[]> {
  //     return this.http.get('/api/events')
  //         .pipe(
  //             map(res => res['payload'])
  //         );
  //   }
  // }
  export class AdminEventService extends ApiRestGenericLibService<Event> {
    CELL_URL_BASE = `${this.apiUrl}/events`;
  
    constructor(public http: HttpClient) {
      super(http);
      this.c = Event;
      this.url = this.CELL_URL_BASE;
    }
  }



// @Injectable({
//   providedIn: 'root'
// })
// export class AdminEventService extends ApiRestGenericLibService<Event> {
//   EVENT_URL_BASE = `${this.apiUrl}/admin-events`;

//   constructor(public http: HttpClient) {
//     super(http);
//     this.c = Event;
//     this.url = this.EVENT_URL_BASE;
//   }
// }
