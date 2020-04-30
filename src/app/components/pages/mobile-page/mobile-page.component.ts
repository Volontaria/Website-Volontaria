import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  templateUrl: 'mobile-page.component.html',
  selector: 'app-mobile',
  styleUrls: ['mobile-page.component.scss'],
})
export class MobilePageComponent {

  instanceConfig = JSON.stringify( {
    'instanceAPIUrl': environment.url_base_api
  });

  constructor() {

  }

  goToLink(url: string) {
    window.open(url, '_blank');
  }
}
