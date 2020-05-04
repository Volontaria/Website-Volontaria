import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  templateUrl: 'mobile-page.component.html',
  selector: 'app-mobile',
  styleUrls: ['mobile-page.component.scss'],
})

export class MobilePageComponent {

  APIUrl = environment.url_base_api;

  instanceConfig = JSON.stringify( {
    'instanceAPIUrl': this.APIUrl,
    'token': localStorage.getItem('token')
  });

  constructor() {

  }
}
