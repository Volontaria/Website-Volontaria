import { Injectable } from '@angular/core';
import {ApiRestGenericLibService} from './api-rest-generic-lib.service';
import {HttpClient} from '@angular/common/http';
import {Cell} from '../models/cell';

@Injectable({
  providedIn: 'root'
})
export class CellService extends ApiRestGenericLibService<Cell> {
  CELL_URL_BASE = `${this.apiUrl}/cells`;

  constructor(public http: HttpClient) {
    super(http);
    this.c = Cell;
    this.url = this.CELL_URL_BASE;
  }
}
