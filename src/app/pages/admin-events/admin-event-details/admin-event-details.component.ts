import { Component, OnInit, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router, Route } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Event } from '../../../models/event'
import { EventService} from '../../../services/event.service';
import {ResponseApi} from '../../../models/api';


@Component({
  selector: 'app-admin-event-details',
  templateUrl: './admin-event-details.component.html',
  styleUrls: ['./admin-event-details.component.scss']
})
export class AdminEventDetailsComponent implements OnInit {

  loading: boolean = true;
  // an_event$: Event = {} as Event;
  an_event$!: Observable<Event>;
  // an_event$: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService) { }


  ngOnInit() {
    // see https://angular.io/guide/router-tutorial-toh#define-a-wildcard-route
    this.an_event$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.eventService.getById(Number(params.get('id')!)))
    );
  }

  gotoEvents(an_event: Event) {
    const eventId = an_event ? an_event.id : null;
    // Pass along the event id if available
    // so that the EventList component can select that event.
    // Include a junk 'foo' property for fun.
    this.router.navigate(['/admin-events', { id: eventId, foo: 'foo' }]);
  }

}
  // @Input() event?: Event;

  // ref: https://github.com/careydevelopment/careydevelopmentcrm/blob/0.2.6-click-to-edit-contacts/src/app/features/contacts/edit-contact/edit-contact.component.ts

  // ngOnInit(): void {

  // }

  // ngOnInit(): void {
  //  this.getEventDetail();
  // }

  // // Mimicking getHero from Angular Tutorial at https://angular.io/tutorial/toh-pt5
  // getEventDetail(): void {
  //   const id = Number(this.route.snapshot.paramMap.get('id'));
  //   this.eventService.getById(id)
  //     .subscribe(event => this.event = event);
  // }

  // TODO: how to use getById function instead?
 