import { HttpHeaders } from '@angular/common/http';

export default class GlobalService {

  getHeaders(){
    let options = {'Content-Type': 'application/json'};

    let token = localStorage.getItem('token');
    if(token){
      options['Authorization'] = 'Token ' + token;
    }
    let header = new HttpHeaders(options);
    return header;
  }
}
