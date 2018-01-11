import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import GlobalService from "./globalService";


@Injectable()
export class CellService extends GlobalService{

  constructor(public http:HttpClient) {
    super();
  }

  getCells(): Observable<any> {
    let headers = this.getHeaders();
    return this.http.get<any>(
      'http://api.nousrire.com/volunteer/cells',
      {headers: headers}
    );
  }
}
