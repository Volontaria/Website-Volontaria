import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import GlobalService from './globalService';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';
import { Participation } from '../models/participation';


@Injectable()
export class ParticipationService extends GlobalService {

  url_participations = environment.url_base_api + environment.paths_api.participations;

  constructor(public http: HttpClient,
              private authenticationService: AuthenticationService) {
    super();
  }

  createParticipation(data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(
      this.url_participations,
      data,
      {headers: headers}
      );
  }

  updateParticipation(id: number, data: any) {
    const headers = this.getHeaders();
    return this.http.patch<any>(
      this.url_participations + '/' + id,
      data,
      {headers: headers}
    );
  }

  getParticipations(filters: {name: string, value: any}[] = null): Observable<any> {
    const headers = this.getHeaders();
    let params = new HttpParams();

    if (filters != null) {
      for (const filter of filters) {
        if (filter.name === 'event') {
          params = params.set('event', filter.value);
        }
        if (filter.name === 'username') {
          params = params.set('username', encodeURIComponent(filter.value));
        }
      }
    }
    return this.http.get<any>(
      this.url_participations,
      {headers: headers, params: params}
    );
  }

  getMyParticipations(): Observable<any> {
    const headers = this.getHeaders();
    const username = this.authenticationService.getProfile().username;
    const params = new HttpParams().set('username', username);

    return this.http.get<any>(
      this.url_participations,
      {headers: headers, params: params}
    );
  }

  deleteParticipation(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(
      this.url_participations + '/' + id,
      {headers: headers}
    );
  }
}
