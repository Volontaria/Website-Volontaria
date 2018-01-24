import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {EventService} from '../../../../services/event.service';
import { Event } from '../../../../models/event';
import {ParticipationService} from '../../../../services/participation.service';
import {NotificationsService} from 'angular2-notifications';
import {User} from '../../../../models/user';
import {AuthenticationService} from '../../../../services/authentication.service';


@Component({
  templateUrl: 'activity-confirmation-page.component.html',
  styleUrls: ['activity-confirmation-page.component.scss'],
  selector: 'app-activity-confirmation'
})
export class ActivityConfirmationComponent implements OnInit {

  event: Event;
  user: User;

  constructor(private activatedRoute: ActivatedRoute,
              private eventService: EventService,
              private participationService: ParticipationService,
              private notificationService: NotificationsService,
              private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    this.user = this.authenticationService.getProfile();

    this.activatedRoute.params.subscribe((params: Params) => {
      this.eventService.getEvent(params['eventId']).subscribe(
        data => {
          this.event = new Event(data);
        }
      );
    });
  }

  submit(standby: boolean) {
    console.log('Call submit to create new participation');
    this.participationService.createParticipation(this.event.id, standby).subscribe(
      data => {
        this.notificationService.success('Inscription réussie', 'Merci!');
        this.router.navigate(['/schedule']);
      }
    );
  }
}
