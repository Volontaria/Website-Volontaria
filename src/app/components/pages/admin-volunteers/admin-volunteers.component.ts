import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import {Router} from '@angular/router';


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
    this.userService.getUsers().subscribe(
      data => {
        this.users = data.results.map(u => new User(u) );
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
