import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  template: `
    <div id="container">
      <div id="header">
        <app-header></app-header>
      </div>
      <div id="content">
        <div class="left-nav">
          <span class="left-nav__header">
            Administration
          </span>
          <a routerLink="/admin" class="left-nav__item">
            <i class="fa fa-area-chart"></i>
            Général
          </a>
          <a routerLink="/admin/volunteers" class="left-nav__item" hasPermissions="['list_users']">
            <i class="fa fa-users"></i>
            Bénévoles
          </a>
          <a routerLink="/admin/cells" class="left-nav__item">
            <i class="fa fa-map-marker"></i>
            Cellules
          </a>
          <a routerLink="/admin/cycles" class="left-nav__item">
            <i class="fa fa-calendar"></i>
            Cycles de commande
          </a>
        </div>
        <div id="main">
          <router-outlet></router-outlet>
        </div>
      </div>
      <div id="footer">
        <app-footer></app-footer>
      </div>
    </div>
  `,
  styleUrls: ['admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
