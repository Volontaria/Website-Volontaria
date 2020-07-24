import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Participation} from '../../../../models/participation';
import {ParticipationService} from '../../../../services/participation.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ModalService} from '../../../../services/modal.service';

@Component({
  selector: 'app-schedule-section-card',
  templateUrl: './schedule-section-card.component.html',
  styleUrls: ['./schedule-section-card.component.scss']
})
export class ScheduleSectionCardComponent implements OnInit {

  @Input() participation: Participation;
  @Input() canDelete = false;

  @Output() onDeletion: EventEmitter<boolean> = new EventEmitter<boolean>();

  deleteModalName: string;

  constructor(private participationService: ParticipationService,
              private snackBar: MatSnackBar,
              private modalService: ModalService) { }

  ngOnInit(): void {
    this.deleteModalName = 'delete_participation_' + this.participation.id;
  }

  deleteParticipation(): void {
    this.participationService.delete(this.participation.url).subscribe(
      (data) => {
        this.snackBar.open(
          'Votre participation a été supprimée',
          'X',
          {
            duration: 10000,
          }
        );

        this.modalService.get(this.deleteModalName).close();

        this.onDeletion.emit(true);
      }
    );
  }
}
