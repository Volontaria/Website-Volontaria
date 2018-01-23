import { HttpHeaders } from '@angular/common/http';

export default class GlobalService {

  getHeaders() {
    const options = {'Content-Type': 'application/json'};

    const token = localStorage.getItem('token');
    if (token) {
      options['Authorization'] = 'Token ' + token;
    }
    const header = new HttpHeaders(options);
    return header;
  }
}
