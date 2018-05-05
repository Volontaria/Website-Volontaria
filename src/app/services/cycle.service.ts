import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import GlobalService from './globalService';
import { environment } from '../../environments/environment';
import {Cycle} from '../models/cycle';


@Injectable()
export class CycleService extends GlobalService {

  url_cycles = environment.url_base_api + environment.paths_api.cycles;

  constructor(public http: HttpClient) {
    super();
  }

  getCycles(isActive: boolean= null): Observable<any> {
    const headers = this.getHeaders();
    let params = new HttpParams();

    if (isActive != null) {
      params = params.set('is_active', isActive.toString());
    }

    return this.http.get<any>(
      this.url_cycles,
      {headers: headers, params: params}
    );
  }

  createCycle(cycle: Cycle): Observable<any>  {
    const headers = this.getHeaders();
    return this.http.post<any>(
      this.url_cycles,
      cycle,
      {headers: headers}
    );
  }
}
