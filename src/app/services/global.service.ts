import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  public apiUrl = environment.url_base_api;

  constructor() {}

  static getHeaders(): HttpHeaders{
    const options = {
      'Content-Type': 'application/json',
      'Accept-Language': environment.default_language,
    };

    return new HttpHeaders(options);
  }
}
