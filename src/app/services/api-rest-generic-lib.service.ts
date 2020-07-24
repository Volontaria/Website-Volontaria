import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';
import { map } from 'rxjs/operators';
import { ResponseApi } from '../models/api';
import { SearchField } from '../models/search-field';
import {Deserializable} from '../models/deserializable';

@Injectable({
  providedIn: 'root',
})
export class ApiRestGenericLibService<T extends Deserializable> extends GlobalService {
  public url: string;

  // Class déclaration from type
  c: new () => T;

  constructor(public http: HttpClient) {
    super();
  }

  get(url: string): Observable<T> {
    return this.http
      .get<T>(url, { headers: GlobalService.getHeaders() })
      .pipe(map((data) => new this.c().deserialize(data)));
  }

  getById(id: number): Observable<T> {
    return this.http
      .get<T>(this.url + '/' + id, {
        headers: GlobalService.getHeaders(),
      })
      .pipe(map((data) => new this.c().deserialize(data)));
  }

  list(): Observable<ResponseApi<T>> {
    return this.http
      .get<ResponseApi<T>>(this.url, {
        headers: GlobalService.getHeaders(),
      })
      .pipe(
        map((responseApi: ResponseApi<T>) => {
          responseApi.results = responseApi.results.map((data) =>
            new this.c().deserialize(data)
          );
          return responseApi;
        })
      );
  }

  search(searchFields: SearchField): Observable<ResponseApi<T>> {
    const params: HttpParams = new HttpParams({
      fromObject: searchFields,
    });

    const headers: HttpHeaders = GlobalService.getHeaders();

    return this.http
      .get<ResponseApi<T>>(this.url, {
        headers,
        params,
      })
      .pipe(
        map((responseApi: ResponseApi<T>) => {
          responseApi.results = responseApi.results.map((data) =>
            new this.c().deserialize(data)
          );
          return responseApi;
        })
      );
  }

  post(object: T): Observable<T> {
    return this.http
      .post<T>(this.url, object, {
        headers: GlobalService.getHeaders(),
      })
      .pipe(map((data) => new this.c().deserialize(data)));
  }

  patch(url: string, patchContent: any): Observable<T> {
    const headers: HttpHeaders = GlobalService.getHeaders();

    return this.http
      .patch<T>(url, patchContent, { headers })
      .pipe(map((data) => new this.c().deserialize(data)));
  }

  delete(url: string): Observable<any> {
    return this.http.delete<any>(url, { headers: GlobalService.getHeaders() });
  }
}
