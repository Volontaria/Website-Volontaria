import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Event } from '../../../models/event';
import { ActivatedRoute, Params } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { Participation } from '../../../models/participation';
import { ParticipationService } from '../../../services/participation.service';


@Component({
  selector: 'app-admin-event',
  templateUrl: './admin-event.component.html',
  styleUrls: ['admin-event.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminEventComponent implements OnInit {

  event: Event;
  participations: Participation[];

  constructor(private activatedRoute: ActivatedRoute,
              private eventService: EventService,
              private participationService: ParticipationService) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.eventService.getEvent(params['eventId']).subscribe(
        data => {
          this.event = data;
          this.get_participations();
        }
      );
    });
  }

  get_participations() {
    this.participationService.getParticipations(this.event.id).subscribe(
      data => {
        this.participations = data.results.map(p => new Participation(p) );
      }
    );
  }
}
