import {Component, Input, OnInit} from '@angular/core';
import {Event} from '../../../models/event';

@Component({
  selector: 'app-event-detail-preview',
  templateUrl: './event-detail-preview.component.html',
  styleUrls: ['./event-detail-preview.component.scss']
})
export class EventDetailPreviewComponent implements OnInit {

  @Input() event: Event;

  constructor() { }

  ngOnInit(): void {
  }

  get numberOfVolunteer(): number {
    if (this.event) {
      return this.event.nb_volunteers;
    } else {
      return null;
    }
  }

  get numberOfStandby(): number {
    if (this.event) {
      return this.event.nb_volunteers_standby;
    } else {
      return null;
    }
  }

  get numberOfVolunteerNeeded(): number {
    if (this.event) {
      return this.event.nb_volunteers_needed;
    } else {
      return null;
    }
  }

  get numberOfStandbyNeeded(): number {
    if (this.event) {
      return this.event.nb_volunteers_standby_needed;
    } else {
      return null;
    }
  }
}
