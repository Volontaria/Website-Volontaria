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

  getEvents(filters: {name: string, value: any}[] = null): Observable<any> {
    const headers = this.getHeaders();
    let params = new HttpParams();
    if (filters != null) {
      for (const filter of filters) {
        if (filter.name === 'cell') {
          params = params.set('cell', filter.value);
        }
        if (filter.name === 'cycle') {
          params = params.set('cycle', filter.value);
        }
        if (filter.name === 'volunteers') {
          params = params.set('volunteers', filter.value);
        }
        if (filter.name === 'start_date') {
          params = params.set('start_date__gte', filter.value);
        }
        if (filter.name === 'end_date') {
          params = params.set('start_date__lte', filter.value);
        }
      }
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

  createEvent(body: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(
      this.url_events,
      body,
      {headers: headers}    );
  }

  updateEvent(id: number, data: any) {
    const headers = this.getHeaders();
    return this.http.patch<any>(
      this.url_events + '/' + id,
      data,
      {headers: headers}    );
  }
}

