import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../services/authentication.service';

interface InstanceConfig {
  instanceAPIUrl: string;
  token?: string;
}

@Component({
  selector: 'app-promotion-mobile',
  templateUrl: './promotion-mobile.component.html',
  styleUrls: ['./promotion-mobile.component.scss'],
})
export class PromotionMobileComponent {
  apiUrl = environment.url_base_api;

  instanceConfig: string;

  constructor(private authenticationService: AuthenticationService) {
    const instanceConfig: InstanceConfig = {
      instanceAPIUrl: this.apiUrl,
      token: this.authenticationService.getToken(),
    };
    this.instanceConfig = JSON.stringify(instanceConfig);
  }
}
