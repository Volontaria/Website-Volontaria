import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import GlobalService from './globalService';
import {environment} from '../../environments/environment';


@Injectable()
export class CellService extends GlobalService{

  url_cells = environment.url_base_api + environment.paths_api.cells;

  constructor(public http:HttpClient) {
    super();
  }

  getCells(): Observable<any> {
    let headers = this.getHeaders();
    return this.http.get<any>(
      this.url_cells,
      {headers: headers}
    );
  }
}
