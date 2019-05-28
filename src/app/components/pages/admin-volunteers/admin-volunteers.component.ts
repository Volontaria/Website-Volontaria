import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AdminUser } from '../../../models/user';
import { Router } from '@angular/router';
import { isNull } from 'util';


@Component({
  selector: 'app-admin-volunteers',
  templateUrl: './admin-volunteers.component.html',
  styleUrls: ['admin-volunteers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminVolunteersComponent implements OnInit {

  listUsers: AdminUser[];
  userFilters = [];
  typingTimer;
  doneTypingInterval = 250;

  settings = {
    noDataText: 'Aucun utilisateur pour le moment.',
    clickable: true,
    //previous: false,
    //next: false,
    numberOfPage: 0,
    page: 0,
    columns: [
      {
        name: 'username',
        title: 'Nom d\'utilisateur'
      },
      {
        name: 'first_name',
        title: 'Prénom'
      },
      {
        name: 'last_name',
        title: 'Nom'
      },
      {
        name: 'email',
        title: 'Courriel'
      },
      {
        name: 'phone',
        title: 'Téléphone'
      },
      {
        name: 'mobile',
        title: 'Mobile'
      },
      {
        name: 'is_active',
        title: 'Actif',
        type: 'boolean'
      },
      {
        name: 'is_superuser',
        title: 'Admin',
        type: 'boolean'
      },
      {
        name: 'last_participation',
        title: 'Dernière participation',
        type: 'date'
      },
      {
        name: 'volunteer_note',
        title: 'Note'
      }
    ]
  };

  constructor(private userService: UserService,
              private router: Router) {}

  ngOnInit() {
    this.listUsers = [];
  }

  // changePage(index: number) {
  //   this.refreshUserList(index);
  // }

  refreshUserList(page = 1, limit = 25) {

    this.userService.list(this.userFilters, limit, limit * (page - 1)).subscribe(
      users => {
        //this.settings.numberOfPage = Math.ceil(users.count / limit);
        //this.settings.page = page;
        //this.settings.previous = !isNull(users.previous);
        //this.settings.next = !isNull(users.next);
        this.listUsers = users.results.map(u => new AdminUser(u) );
      }
    );
  }

  filter(value) {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(
      () => {
          if (value == '') {
            this.listUsers = [];
          } else {
            this.updateFilter(value);
          }
        },
      this.doneTypingInterval
    );
  }

  updateFilter(value, name= 'search') {
    let update = false;
    for (const filter of this.userFilters) {
      if (filter.name === name) {
        filter.value = value;
        update = true;
      }
    }
    if (!update) {
      const newFilter = {
        name: name,
        value: value
      };
      this.userFilters.push(newFilter);
    }
    this.refreshUserList();
  }

  userClicked(user) {
    this.router.navigate(['/admin/volunteer/' + user.id]);
  }
}
