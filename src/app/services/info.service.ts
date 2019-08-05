import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import GlobalService from './globalService';
import {environment} from '../../environments/environment';


@Injectable()
export class InfoPageService extends GlobalService {

  url_info_section = environment.url_base_api + environment.paths_api.info_page;

  constructor(public http: HttpClient) {
    super();
  }

  getInfos(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(
      this.url_info_section,
      {headers: headers}
    );
  }
}

