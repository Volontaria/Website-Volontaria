import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

interface AuthenticationResponse {
  token: string;
}

@Injectable()
export class AuthenticationService {

  url_authentication = environment.url_base_api + environment.paths_api.authentication;

  constructor(public http: HttpClient) { }

  authenticate(login: string, password: string): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(
      this.url_authentication,
      {
        login: login,
        password: password
      });
  }

  isAuthenticated() {
    let token = localStorage.getItem('token');

    if (token) {
      return true;
    }

    return false;
  }

  getProfile() {
    return JSON.parse(localStorage.getItem('userProfile'));
  }
}
