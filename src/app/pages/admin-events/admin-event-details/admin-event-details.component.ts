import { Component, OnInit, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { Event } from '../../../models/event'
import { ActivatedRoute, ParamMap, Router, Route } from '@angular/router';
import { EventService} from '../../../services/event.service';



@Component({
  selector: 'app-admin-event-details',
  templateUrl: './admin-event-details.component.html',
  styleUrls: ['./admin-event-details.component.scss']
})
export class AdminEventDetailsComponent implements OnInit {

  loading: boolean = true;
  event: Event = {} as Event;

  constructor(private route: ActivatedRoute,
    private eventService: EventService) { }

  // @Input() event?: Event;

  // ref: https://github.com/careydevelopment/careydevelopmentcrm/blob/0.2.6-click-to-edit-contacts/src/app/features/contacts/edit-contact/edit-contact.component.ts

  // ngOnInit(): void {

  // }

  ngOnInit(): void {
    let event$ = this.route.queryParamMap.pipe(
      switchMap((params: ParamMap) =>
        this.eventService.getById(id))   // TODO: adjust arguments for getById
    );

    event$.subscribe(
      (event: Event) => this.handleResponse(event),
      err => this.handleError(err)
    );
  }

  private handleResponse(event: Event) {
    this.event = event;
    this.loading = false;
  }

  private handleError(err: Error) {
    console.log(err);
    this.loading = false;

    let alertMessage: string = 'Something went wrong, please call support';

    if (err instanceof HttpErrorResponse) {
      if (err.status) {
        if (err.status == 404) {
          alertMessage = 'Contact with that ID does not exist';
        }
      }
    }

    // this.alertService.error(alertMessage);
  }

}
