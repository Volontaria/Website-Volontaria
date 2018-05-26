import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import GlobalService from './globalService';
import {AuthenticationService} from './authentication.service';
import {environment} from '../../environments/environment';
import {User} from '../models/user';


@Injectable()
export class EventService extends GlobalService {

  url_events = environment.url_base_api + environment.paths_api.events;

  constructor(public http: HttpClient,
              private authenticationService: AuthenticationService) {
    super();
  }

  getEvents(cell: number = null, cycle: number = null): Observable<any> {
    const headers = this.getHeaders();
    let params = new HttpParams();
    if (cell != null) {
      params = params.set('cell', cell.toString());
    }
    if (cycle != null) {
      params = params.set('cycle', cycle.toString());
    }
    return this.http.get<any>(
      this.url_events,
      {headers: headers, params: params}
    );
  }

  getEvent(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(
      this.url_events + '/' + id,
      {headers: headers}
    );
  }

  getEventWhereVolunteer(): Observable<any> {
    const headers = this.getHeaders();
    const userId = this.authenticationService.getProfile().id;
    const params = new HttpParams().set('volunteers', userId);

    return this.http.get<any>(
      this.url_events,
      {headers: headers, params: params}
    );
  }

  createEvent(body: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(
      this.url_events,
      body,
      {headers: headers}    );
  }

}
