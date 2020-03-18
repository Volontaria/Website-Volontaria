import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import GlobalService from './globalService';
import {environment} from '../../environments/environment';
import {Cycle} from '../models/cycle';
import {Tasktype} from '../models/tasktype';


@Injectable()
export class TasktypeService extends GlobalService {

  URL_TASK_TYPE = environment.url_base_api + environment.paths_api.tasktypes;

  constructor(public http: HttpClient) {
    super();
  }

  getTasktypes(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(
      this.URL_TASK_TYPE,
      {headers: headers}
    );
  }

  create(task: Tasktype): Observable<any>  {
    const headers = this.getHeaders();
    return this.http.post<any>(
      this.URL_TASK_TYPE,
      task,
      {headers: headers}
    );
  }
}
