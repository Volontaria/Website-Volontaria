import { Component, OnInit } from '@angular/core';
import { ParticipationService } from '../../services/participation.service';
import { Participation } from '../../models/participation';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { ResponseApi } from '../../models/api';
import * as moment from 'moment';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  participationsFuture: Participation[];
  participationsFuture$: Observable<Participation[]>;

  constructor(private participationService: ParticipationService) {}

  ngOnInit(): void {
    this.getParticipationsFuture();
  }

  getParticipationsFuture(): void {
    const searchField = {
      event__start_time__gte: moment().toISOString(),
    };
    this.participationsFuture$ = this.participationService.search(searchField).pipe(
      map((responseApi: ResponseApi<Participation>) => {
        return responseApi.results;
      })
    );
    this.participationsFuture$.subscribe((participations: Participation[]) => {
      this.participationsFuture = participations;
    });
  }
}
