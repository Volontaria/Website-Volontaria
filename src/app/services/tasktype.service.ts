import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import GlobalService from './globalService';
import {environment} from '../../environments/environment';


@Injectable()
export class TasktypeService extends GlobalService {

  url_tasktypes = environment.url_base_api + environment.paths_api.tasktypes;

  constructor(public http: HttpClient) {
    super();
  }

  getTasktypes(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(
      this.url_tasktypes,
      {headers: headers}
    );
  }
}
