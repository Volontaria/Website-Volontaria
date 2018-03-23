import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';


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

  constructor(private userService: UserService) {}

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
        console.log(this.users[user].first_name);
        console.log(this.search);
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
}
