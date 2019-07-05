import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { Router } from '@angular/router';
import { isNull } from 'util';


@Component({
  selector: 'app-admin-volunteers',
  templateUrl: './admin-volunteers.component.html',
  styleUrls: ['admin-volunteers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminVolunteersComponent implements OnInit {

  listUsers: User[];
  userFilters = [];
  typingTimer;
  doneTypingInterval = 250;

  settings = {
    noDataText: 'Aucun utilisateur pour le moment.',
    clickable: true,
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
      }
    ]
  };

  constructor(private userService: UserService,
              private router: Router) {}

  ngOnInit() {
    this.listUsers = [];
  }

  refreshUserList(page = 1, limit = 25) {

    this.userService.list(this.userFilters, limit, limit * (page - 1)).subscribe(
      users => {
        this.listUsers = users.results.map(u => new User(u) );
      }
    );
  }

  filter(value) {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(
      () => {
          if (value === '') {
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
