import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {ParticipationService} from '../../../services/participation.service';
import {EventService} from '../../../services/event.service';
import {CellService} from '../../../services/cell.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  userCount = '-';
  participationCount = '-';
  eventCount = '-';
  cellCount = '-';


  constructor(private userService: UserService,
              private participationService: ParticipationService,
              private eventService: EventService,
              private cellService: CellService) { }

  ngOnInit() {
    this.refreshUsersData();
    this.refreshParticipationsData();
    this.refreshEventsData();
    this.refreshCellsData();
  }

  refreshUsersData() {
   this.userService.list().subscribe(
     data => {
       this.userCount = data.count;
     }
   );
  }

  refreshParticipationsData() {
    this.participationService.getParticipations().subscribe(
      data => {
        this.participationCount = data.count;
      }
    );
  }

  refreshEventsData() {
    this.eventService.getEvents().subscribe(
      data => {
        this.eventCount = data.count;
      }
    );
  }

  refreshCellsData() {
    this.cellService.getCells().subscribe(
      data => {
        this.cellCount = data.count;
      }
    );
  }
}
