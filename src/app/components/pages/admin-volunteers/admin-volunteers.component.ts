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

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(
      data => {
        this.users = data.results.map(u => new User(u) );
      }
    );
  }
}
