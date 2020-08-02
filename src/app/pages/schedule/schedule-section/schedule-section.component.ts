import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Participation } from '../../../models/participation';

@Component({
  selector: 'app-schedule-section',
  templateUrl: './schedule-section.component.html',
  styleUrls: ['./schedule-section.component.scss'],
})
export class ScheduleSectionComponent implements OnInit {
  @Input() title: string;
  @Input() participations: Participation[];
  @Input() canDelete = false;

  @Output() onDeletion: EventEmitter<boolean> = new EventEmitter<boolean>();
  eventIndex: number = 0;

  constructor() {}

  ngOnInit(): void {}

  refreshParticipations(): void {
    this.onDeletion.emit(true);
  }

  previousEvent(): void {
    if (this.eventIndex > 0) {
      this.eventIndex -= 1;
    }
  }

  nextEvent(): void {
    if (this.eventIndex < this.participations.length - 1) {
      this.eventIndex += 1;
    }
  }

  haveNext(): boolean {
    if (this.participations) {
      return this.eventIndex !== this.participations.length - 1;
    } else {
      return false;
    }
  }

  havePrevious() {
    if (this.participations) {
      return this.eventIndex !== 0;
    } else {
      return false;
    }
  }
}
