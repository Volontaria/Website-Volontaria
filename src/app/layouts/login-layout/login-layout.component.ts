import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-login-layout',
  template: `
    <div class="login-layout">
      <div class="login-layout__name">
        {{ projectName }}
      </div>
      <div class="login-layout__card">
        <div class="login-layout__card__content card">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['login-layout.component.scss'],
})
export class LoginLayoutComponent implements OnInit {

  projectName = environment.project_name;

  constructor() { }

  ngOnInit() {
  }

}
