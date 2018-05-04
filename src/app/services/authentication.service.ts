import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import GlobalService from './globalService';
import { Cell } from '../models/cell';

interface AuthenticationResponse {
  token: string;
}

@Injectable()
export class AuthenticationService extends GlobalService {

  url_authentication = environment.url_base_api + environment.paths_api.authentication;

  constructor(public http: HttpClient) {
    super();
  }

  authenticate(login: string, password: string): Observable<AuthenticationResponse> {
    const headers = this.getHeaders();
    return this.http.post<AuthenticationResponse>(
      this.url_authentication,
      {
        login: login,
        password: password
      },
      {headers: headers}
    );
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');

    if (token) {
      return true;
    }

    return false;
  }

  isAdmin() {
    return this.getProfile().is_superuser;
  }

  isManager(id_cell: number = null) {
    const cells: Cell[] = this.getProfile().managed_cell.map(c => new Cell(c));
    if (id_cell) {
      for (const cell in cells) {
        if (cells.hasOwnProperty(cell)) {
          if (cell['id'] === id_cell) {
            return true;
          }
        }
      }
    } else {
      return !(cells.length === 0);
    }
    return false;
  }

  getProfile() {
    return JSON.parse(localStorage.getItem('userProfile'));
  }

  hasPermissions(permissions: string[]) {
    // Shortcut for admin only
    if (this.isAdmin()) {
      return true;
    }

    // Define here all the default permissions
    const list_permissions: string[] = [];

    if (this.isManager()) {
      list_permissions.push('access_admin_panel');
    }

    for (const permission in permissions) {
      if (list_permissions.indexOf(permissions[permission]) === -1) {
        return false;
      }
    }
    return true;
  }
}
