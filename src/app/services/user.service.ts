import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import GlobalService from './globalService';
import {User} from '../models/user';
import {environment} from '../../environments/environment';


@Injectable()
export class UserService extends GlobalService {

  url_users = environment.url_base_api + environment.paths_api.users;
  url_activation = environment.url_base_api + environment.paths_api.activation;
  url_profile = environment.url_base_api + environment.paths_api.profile;

  constructor(public http: HttpClient) {
    super();
  }

  createUser(user: User, password: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(
      this.url_users,
      {
        username: user.username,
        password: password,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        mobile: user.mobile,
      },
      {headers: headers}
    );
  }

  getProfile(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(
      this.url_profile,
      {headers: headers}
    );
  }

  activate(token: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(
      this.url_activation,
      {
        activation_token: token
      },
      {headers: headers}
  );
  }

}
