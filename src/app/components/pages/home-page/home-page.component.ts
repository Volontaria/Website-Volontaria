import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Cycle} from '../../../models/cycle';
import {CycleService} from '../../../services/cycle.service';
import {User} from '../../../models/user';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent {

  cycles: Cycle[];
  user: User;

  constructor(private cycleService: CycleService,
              private userService: UserService)
  {
    this.userService.getProfile().subscribe(
      data => {
        this.user = data;
      }
    );
    this.cycleService.getCycles().subscribe(
      data => {
        this.cycles = data.results.map(c => new Cycle(c) );
      }
    );
  }

}
