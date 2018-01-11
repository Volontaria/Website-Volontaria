import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import GlobalService from "./globalService";
import {User} from "../models/user";


@Injectable()
export class UserService extends GlobalService{

  constructor(public http:HttpClient) {
    super();
  }

  createUser(user:User, password:string): Observable<any> {
    return this.http.post<any>(
      'http://api.nousrire.com/users',
      {
        username: user.username,
        password: password,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        mobile: user.mobile,
      });
  }

  getUsers(): Observable<any> {
    let headers = this.getHeaders();
    return this.http.get<any>(
      'http://api.nousrire.com/users',
      {headers: headers}
    );
  }

  getProfile(): Observable<any> {
    let headers = this.getHeaders();
    return this.http.get<any>(
      'http://api.nousrire.com/profile',
      {headers: headers}
    );
  }

}
