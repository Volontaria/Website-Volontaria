import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";
import {EventService} from "../../../services/event.service";
import {Event} from "../../../models/event";
import {ParticipationService} from "../../../services/participation.service";
import {Participation} from "../../../models/participation";

@Component({
  selector: 'myschedule-page',
  templateUrl: './myschedule-page.component.html',
  styleUrls: ['myschedule-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MySchedulePageComponent implements OnInit {

  user: User;
  participations: Participation;
  events: Event[];
  eventsAsVolunteer: Event[] = [];
  eventsAsOnHold: Event[] = [];

  constructor(private userService:UserService,
              private eventService:EventService,
              private participationService:ParticipationService) {
  }

  ngOnInit() {
    this.userService.getProfile().subscribe(
      data => {
        this.user = data;
      }
    );
    this.participationService.getMyParticipations().subscribe(
      data => {
        this.participations = data.results.map(p => new Participation(p));

        this.eventService.getEventWhereVolunteer().subscribe(
          data => {
            this.events = data.results.map(e => new Event(e));

            for (let event in this.events) {
              for (let participation in this.participations) {
                if( this.events[event].id == this.participations[participation].event ) {
                  if ( this.participations[participation].standby ) {
                    this.eventsAsOnHold.push(this.events[event])
                  }
                  else {
                    this.eventsAsVolunteer.push(this.events[event])
                  }
                }
              }
            }
          }
        );
      }
    );
  }
}
