import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import GlobalService from "./globalService";


@Injectable()
export class CycleService extends GlobalService{

  constructor(public http:HttpClient) {
    super();
  }

  getCycles(): Observable<any> {
    let headers = this.getHeaders();
    return this.http.get<any>(
      'https://api.nousrire.com/volunteer/cycles',
      {headers: headers}
    );
  }
}
