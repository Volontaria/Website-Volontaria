import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { Event } from '../../../models/event';
import { TasktypeService } from '../../../services/tasktype.service';
import { Tasktype } from '../../../models/tasktype';
import { CellService } from '../../../services/cell.service';
import { Cell } from '../../../models/cell';
import { User } from '../../../models/user';
import { AuthenticationService } from '../../../services/authentication.service';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  templateUrl: 'activities-page.component.html',
  selector: 'app-activities',
  styleUrls: ['activities-page.component.scss']
})
export class ActivitiesPageComponent implements OnInit {

  user: User;
  events: Event[];

  filteredEvents: Event[];

  dropdownTasktypeList = [];
  selectedTasktypes = [];
  dropdownTasktypeSettings = {};

  dropdownCellList = [];
  selectedCells = [];
  dropdownCellSettings = {};

  constructor(private eventService: EventService,
              private tasktypeService: TasktypeService,
              private cellService: CellService,
              private authenticationService: AuthenticationService,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.user = this.authenticationService.getProfile();

    this.activatedRoute.params.subscribe((params: Params) => {
      this.eventService.getEvents(null, params['cycle']).subscribe(
        data => {
          this.events = data.results.map(e => new Event(e));
          this.filter();
        }
      );
    });

    this.tasktypeService.getTasktypes().subscribe(
      data => {
        const tasktypes = data.results.map(t => new Tasktype(t) );
        for (const tasktype of Object.keys(tasktypes)) {
          this.dropdownTasktypeList.push(this.tasktypeToDict(tasktypes[tasktype]));
        }
      }
    );

    this.cellService.getCells().subscribe(
      data => {
        const cells = data.results.map(c => new Cell(c) );
        for (const cell of Object.keys(cells)) {
          this.dropdownCellList.push(this.cellToDict(cells[cell]));
        }
      }
    );

    this.dropdownTasktypeSettings = {
      singleSelection: false,
      text: 'Choisi ton(tes) activité(s)',
      selectAllText: 'Toutes',
      unSelectAllText: 'Aucune',
      classes: 'activities-page__filters__filter',
    };

    this.dropdownCellSettings = {
      singleSelection: false,
      text: 'Choisis ta(tes) ville(s)',
      selectAllText: 'Toutes',
      unSelectAllText: 'Aucune',
      classes: 'activities-page__filters__filter',
    };
  }

  onItemSelect(item: any) {
    this.filter();
  }

  OnItemDeSelect(item: any) {
    this.filter();
  }

  onSelectAll(items: any) {
    this.filter();
  }

  onDeSelectAll(items: any) {
    this.filter();
  }

  private tasktypeToDict(tasktype: Tasktype) {
    return {
      'id': tasktype.id,
      'itemName': tasktype.name,
    };
  }

  private cellToDict(cell: Cell) {
    return {
      'id': cell.id,
      'itemName': cell.name,
    };
  }

  private elemIsFiltered(elem, filters) {
    for (const filter in filters) {
      if (filters[filter].id === elem.id) {
        return true;
      }
    }
    return false;
  }

  filter() {
    this.filteredEvents = [];
    const eventFiltered = [];

    for (const event in this.events) {
      if ( new Date(this.events[event].start_date).getTime() > new Date().getTime()) {
        // If no task_type filter or filter is verified
        if ( this.selectedTasktypes.length === 0
          || this.elemIsFiltered(this.tasktypeToDict(this.events[event].task_type), this.selectedTasktypes)) {
          // If no cell filter or filter is verified
          if ( this.selectedCells.length === 0
            || this.elemIsFiltered(this.cellToDict(this.events[event].cell), this.selectedCells)) {
            eventFiltered.push(this.events[event]);
          }
        }
      }
    }

    // If no filters, we take all events
    if (this.selectedCells.length === 0 && this.selectedTasktypes.length === 0) {
      for (const event in this.events) {
        if (new Date(this.events[event].start_date).getTime() > new Date().getTime()) {
          this.filteredEvents.push(this.events[event]);
        }
      }
    } else {
      this.filteredEvents = eventFiltered;
    }
  }
}
