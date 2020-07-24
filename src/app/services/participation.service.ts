import { Injectable } from '@angular/core';
import {ApiRestGenericLibService} from './api-rest-generic-lib.service';
import {HttpClient} from '@angular/common/http';
import {Participation} from '../models/participation';

@Injectable({
  providedIn: 'root'
})
export class ParticipationService extends ApiRestGenericLibService<Participation> {
  PARTICIPATION_URL_BASE = `${this.apiUrl}/participations`;

  constructor(public http: HttpClient) {
    super(http);
    this.c = Participation;
    this.url = this.PARTICIPATION_URL_BASE;
  }
}
