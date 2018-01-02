import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

interface AuthenticationResponse {
  token: string;
}

@Injectable()
export class AuthenticationService {

  constructor(public http:HttpClient) { }

  authenticate(login, password): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(
      'http://127.0.0.1:8000/authentication',
      {
        login: login,
        password: password
      });
  }

  isAuthenticated(){
    let token = localStorage.getItem('token');

    if(token){
      return true;
    }

    return false;
  }

  getProfile(){
    return JSON.parse(localStorage.getItem('userProfile'));
  }
}
