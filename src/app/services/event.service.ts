import { Injectable } from '@angular/core';
import {ApiRestGenericLibService} from './api-rest-generic-lib.service';
import {HttpClient} from '@angular/common/http';
import {Event} from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService extends ApiRestGenericLibService<Event> {
  EVENT_URL_BASE = `${this.apiUrl}/events`;

  constructor(public http: HttpClient) {
    super(http);
    this.c = Event;
    this.url = this.EVENT_URL_BASE;
  }
}
