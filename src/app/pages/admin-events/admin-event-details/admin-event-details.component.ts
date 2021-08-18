import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../../../models/event'

@Component({
  selector: 'app-admin-event-details',
  templateUrl: './admin-event-details.component.html',
  styleUrls: ['./admin-event-details.component.scss']
})
export class AdminEventDetailsComponent implements OnInit {

  constructor() { }

  @Input() event?: Event;

  ngOnInit(): void {
  }

}
