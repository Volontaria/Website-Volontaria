import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ParticipationService } from '../../../services/participation.service';
import { Participation } from '../../../models/participation';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalService } from '../../../services/modal.service';
import { Router } from '@angular/router';
import { ProfileService } from '../../../services/profile.service';
import { User } from '../../../models/user';
import { Event } from '../../../models/event';
import * as moment from 'moment';

@Component({
  selector: 'app-event-detail-list-item',
  templateUrl: './event-detail-list-item.component.html',
  styleUrls: ['./event-detail-list-item.component.scss'],
})
export class EventDetailListItemComponent implements OnInit {
  @Input() event: Event;
  @Input() participations: Participation[];

  profile: User;
  informationPageRead = false;
  createParticipationModal: string;

  constructor(
    private participationService: ParticipationService,
    private snackBar: MatSnackBar,
    private modalService: ModalService,
    private router: Router,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.createParticipationModal = 'create-participation-' + this.event.id;
    this.profile = this.profileService.getProfile();
  }

  getName(): string {
    return this.event.task_type.name;
  }

  getDuration(): string {
    return this.event.readableDuration;
  }

  getDate(): string {
    return this.event.readableStartDate;
  }

  getTime(): string {
    return this.event.readableStartTime + ' à ' + this.event.readableEndTime;
  }

  getStatus(): string {
    if (this.isAlreadySubscribed) {
      return 'Inscrit';
    } else if (this.isFull) {
      return 'Complet';
    } else {
      return '';
    }
  }

  get isFull(): boolean {
    return this.event.isFull;
  }

  get isPast(): boolean {
    return moment(this.event.start_time).isBefore(moment());
  }

  get canSubscribe(): boolean {
    return !this.isPast && !this.isFull && !this.isAlreadySubscribed;
  }

  get isAlreadySubscribed(): boolean {
    for (const participation of this.participations) {
      if (participation.event.id === this.event.id) {
        return true;
      }
    }

    return false;
  }

  createParticipation(isStandby): void {
    if (this.informationPageRead) {
      if (
        (isStandby && !this.event.isFullVolunteerStandby) ||
        (!isStandby && !this.event.isFullVolunteer)
      ) {
        const newParticipation = new Participation().deserialize({
          user: this.profile.url,
          event: this.event.url,
          is_standby: isStandby,
        });

        this.participationService.post(newParticipation).subscribe((data) => {
          this.snackBar.open('Votre participation a été créée', 'X', {
            duration: 10000,
          });

          this.modalService.get(this.createParticipationModal).close();

          this.router.navigate(['/schedule']);
        });
      }
    }
  }
}
