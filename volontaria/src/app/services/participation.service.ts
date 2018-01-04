import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import GlobalService from "./globalService";
import {AuthenticationService} from "./authentication.service";


@Injectable()
export class ParticipationService extends GlobalService{

  constructor(public http:HttpClient,
              private authenticationService:AuthenticationService) {
    super();
  }

  getParticipations(): Observable<any> {
    let headers = this.getHeaders();
    return this.http.get<any>(
      'http://127.0.0.1:8000/volunteer/participations',
      {headers: headers}
    );
  }

  getMyParticipations(): Observable<any> {
    let headers = this.getHeaders();
    let username = this.authenticationService.getProfile().username;
    let params = new HttpParams().set('username', username);

    return this.http.get<any>(
      'http://127.0.0.1:8000/volunteer/participations',
      {headers: headers, params:params}
    );
  }

  getParticipation(id:number): Observable<any> {
    let headers = this.getHeaders();
    return this.http.get<any>(
      'http://127.0.0.1:8000/volunteer/participations/' + id,
      {headers: headers}
    );
  }
}
