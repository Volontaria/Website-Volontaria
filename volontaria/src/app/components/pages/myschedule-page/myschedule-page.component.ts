import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";
import {EventService} from "../../../services/event.service";
import {Event} from "../../../models/event";

@Component({
  selector: 'myschedule-page',
  templateUrl: './myschedule-page.component.html',
  styleUrls: ['myschedule-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MySchedulePageComponent implements OnInit {

  user: User;
  eventsAsVolunteer: Event[];
  eventsAsOnHold: Event[];

  constructor(private userService:UserService,
              private eventService:EventService) {
  }

  ngOnInit() {
    this.userService.getProfile().subscribe(
      data => {
        this.user = data;
      }
    );
    this.eventService.getEventWhereVolunteer().subscribe(
      data => {
        this.eventsAsVolunteer = data.results.map(e => new Event(e));
      }
    );
    this.eventService.getEventWhereOnHold().subscribe(
      data => {
        this.eventsAsOnHold = data.results.map(e => new Event(e));
      }
    );
  }
}
