import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import GlobalService from './globalService';
import {environment} from '../../environments/environment';
import {HttpParams} from '@angular/common/http';


@Injectable()
export class CellService extends GlobalService {

  url_cells = environment.url_base_api + environment.paths_api.cells;

  constructor(public http: HttpClient) {
    super();
  }

  getCells(orderedBy: string= null): Observable<any> {
    const headers = this.getHeaders();
    let params = new HttpParams();

    if (orderedBy !== null) {
      params = params.set('ordering', orderedBy);
    }

    return this.http.get<any>(
      this.url_cells,
      {headers: headers, params: params}
    );
  }

  getCell(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(
      this.url_cells + '/' + id,
      {headers: headers}
    );
  }

  getExportCell(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(
      this.url_cells + '/' + id + '/export',
      {headers: headers}
    );
  }

  getExportCellLink(url: string) {
    return environment.url_base_api + url;
  }
}
