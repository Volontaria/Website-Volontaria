import { Injectable } from '@angular/core';
import {ApiRestGenericLibService} from './api-rest-generic-lib.service';
import {HttpClient} from '@angular/common/http';
import {TaskType} from '../models/taskType';

@Injectable({
  providedIn: 'root'
})
export class TasktypeService extends ApiRestGenericLibService<TaskType> {
  TASKTYPE_URL_BASE = `${this.apiUrl}/task_types`;

  constructor(public http: HttpClient) {
    super(http);
    this.c = TaskType;
    this.url = this.TASKTYPE_URL_BASE;
  }
}
