import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  template: `
    <div id="container">
      <div id="header">
        <app-header></app-header>
      </div>
      <div id="content">
        <div class="left-nav">
          <div class="left-nav__logo">
          </div>
          <a *ngFor="let item of menu" [routerLink]="item.link" class="left-nav__item">
            <i class="left-nav__item__icon {{item.icon}}"></i>
            {{ item.title }}
          </a>
        </div>
        <div class="left-nav-responsive">
          <div class="left-nav-responsive__header title title--secondary">
            Administration
          </div>
          <select class="left-nav-responsive__select" (change)="changePage($event)">
            <option *ngFor="let item of menu" [value]="item.link">{{ item.title }}</option>
          </select>
        </div>
        <div id="main">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit {

  menu = [
    {
      'title': 'Général',
      'link': '/admin',
      'icon': 'fa fa-area-chart'
    },
    {
      'title': 'Bénévoles',
      'link': '/admin/volunteers',
      'icon': 'fa fa-users'
    },
    {
      'title': 'Cellules',
      'link': '/admin/cells',
      'icon': 'fa fa-map-marker'
    },
    {
      'title': 'Cycles de commande',
      'link': '/admin/cycles',
      'icon': 'fa fa-calendar'
    }
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  changePage(event) {
    console.log(event.target.value);
    this.router.navigate([event.target.value]);
  }
}
