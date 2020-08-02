import { Injectable } from '@angular/core';
import { ApiRestGenericLibService } from './api-rest-generic-lib.service';
import { HttpClient } from '@angular/common/http';
import { CkeditorPage } from '../models/ckeditorPage';

@Injectable({
  providedIn: 'root',
})
export class CkeditorPageService extends ApiRestGenericLibService<CkeditorPage> {
  CKEDITOR_PAGE_URL_BASE = `${this.apiUrl}/page`;

  constructor(public http: HttpClient) {
    super(http);
    this.c = CkeditorPage;
    this.url = this.CKEDITOR_PAGE_URL_BASE;
  }
}
