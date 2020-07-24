import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IUserRegister, User } from '../models/user';
import { GlobalService } from './global.service';
import { ProfileService } from './profile.service';

interface AuthenticationResponse {
  key: string;
}

export interface IChangePassword {
  old_password: string;
  new_password1: string;
  new_password2: string;
}

@Injectable()
export class AuthenticationService extends GlobalService {
  TOKEN_KEY = 'token';

  urlAuthentication = `${this.apiUrl}/rest-auth/login/`;
  urlLogout = `${this.apiUrl}/rest-auth/logout/`;
  urlRegister = `${this.apiUrl}/rest-auth/registration/`;
  urlResetPassword = `${this.apiUrl}/rest-auth/password/reset/`;
  urlResetPasswordConfirm = `${this.apiUrl}/rest-auth/password/reset/confirm/`;
  urlPasswordChange = `${this.apiUrl}/rest-auth/password/change/`;


  constructor(public http: HttpClient, public profileService: ProfileService) {
    super();
  }

  register(registerData: IUserRegister): Observable<User> {
    const headers = GlobalService.getHeaders();

    return this.http.post<User>(this.urlRegister, registerData, { headers });
  }

  login(email: string, password: string): Observable<AuthenticationResponse> {
    const headers = GlobalService.getHeaders();
    return this.http
      .post<AuthenticationResponse>(
        this.urlAuthentication,
        {
          email,
          password,
        },
        { headers }
      )
      .pipe(
        tap((response: AuthenticationResponse) => {
          this.setToken(response.key);
          this.profileService.retrieveProfile().subscribe();
        })
      );
  }

  logout(): Observable<any> {
    const headers = GlobalService.getHeaders();
    return this.http
      .post<any>(`${this.urlLogout}`, { headers })
      .pipe(tap(() => this.clean()));
  }

  changePassword(data: IChangePassword): Observable<any> {
    const headers = GlobalService.getHeaders();
    return this.http.post<any>(this.urlPasswordChange, data, {
      headers,
    });
  }

  askForResetPassword(email: string): Observable<any> {
    const headers = GlobalService.getHeaders();
    return this.http.post<any>(
      this.urlResetPassword,
      {
        email,
      },
      { headers }
    );
  }

  resetPassword(
    newPassword1: string,
    newPassword2: string,
    uid: string,
    token: string
  ): Observable<any> {
    const headers = GlobalService.getHeaders();

    const body = {
      new_password1: newPassword1,
      new_password2: newPassword2,
      uid,
      token,
    };
    return this.http
      .post<any>(this.urlResetPasswordConfirm, body, { headers })
      .pipe(
        tap(() => {
          this.logout().subscribe();
        })
      );
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  clean(): void {
    this.removeToken();
    this.profileService.removeProfile();
  }
}
