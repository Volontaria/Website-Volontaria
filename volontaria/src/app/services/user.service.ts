import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(public http:Http) { }

  getUsers() {
    return this.http.get('https://my-json-server.typicode.com/volontaria/mock-api/users')
      .map(res => res.json())
  }

}
