import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import GlobalService from './globalService';
import {environment} from '../../environments/environment';


@Injectable()
export class CycleService extends GlobalService {

  url_cycles = environment.url_base_api + environment.paths_api.cycles;

  constructor(public http: HttpClient) {
    super();
  }

  getCycles(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(
      this.url_cycles,
      {headers: headers}
    );
  }
}
