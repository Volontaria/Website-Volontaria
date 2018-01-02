
import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {EventService} from "../../../../services/event.service";
import { Event } from "../../../../models/event";


@Component({
  templateUrl: 'activity-confirmation-page.component.html',
  styleUrls: ['activity-confirmation-page.component.scss'],
  selector: 'activity-confirmation-page'
})
export class ActivityConfirmationComponent implements OnInit {

  event: Event;

  constructor(private activatedRoute:ActivatedRoute,
              private eventService:EventService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.eventService.getEvent(params['eventId']).subscribe(
        data => {
          this.event = new Event(data);
          console.log(this.event);
        }
      );
    });
  }
}
