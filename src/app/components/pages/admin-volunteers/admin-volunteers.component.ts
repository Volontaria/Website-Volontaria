import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import {Router} from '@angular/router';
import {isNull} from "util";


@Component({
  selector: 'app-admin-volunteers',
  templateUrl: './admin-volunteers.component.html',
  styleUrls: ['admin-volunteers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminVolunteersComponent implements OnInit {

  users: User[];
  filteredUsers: User[];

  search: string;


  settings = {
    noDataText: 'Aucun utilisateur pour le moment.',
    clickable: true,
    previous: false,
    next: false,
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
    this.refreshUserList();
  }

  changePage(index: number) {
    this.refreshUserList(index);
  }

  refreshUserList(page = 1, limit = 50) {
    this.userService.list(null, limit, limit * (page - 1)).subscribe(
      users => {
        this.settings.numberOfPage = Math.ceil(users.count / limit);
        this.settings.page = page;
        this.settings.previous = !isNull(users.previous);
        this.settings.next = !isNull(users.next);
        this.users = users.results.map(u => new User(u) );
        this.filteredUsers = this.users;
      }
    );
  }

  filter() {
    this.filteredUsers = [];
    const userFiltered = [];

    for (const user in this.users) {
      if ( user ) {
        if (this.users[user].first_name.indexOf(this.search) >= 0
          || this.users[user].last_name.indexOf(this.search) >= 0
          || this.users[user].email.indexOf(this.search) >= 0
          || this.users[user].username.indexOf(this.search) >= 0) {
          userFiltered.push(this.users[user]);
        }
      }
    }

    if (this.search === '') {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = userFiltered;
    }
  }

  userClicked(user) {
    this.router.navigate(['/admin/volunteer/' + user.id]);
  }
}
