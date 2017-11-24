import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  constructor(public http:HttpClient) { }

  getUsers(): Observable<object[]> {
    return this.http.get<object[]>('https://my-json-server.typicode.com/volontaria/mock-api/users');
  }

}
