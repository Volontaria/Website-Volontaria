import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { Event } from '../../../models/event';
import { TasktypeService } from '../../../services/tasktype.service';
import { Tasktype } from '../../../models/tasktype';
import { CycleService } from '../../../services/cycle.service';
import { Cycle } from '../../../models/cycle';
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

  dropdownCycleList = [];
  selectedCycles = [];
  dropdownCycleSettings = {};

  constructor(private eventService: EventService,
              private tasktypeService: TasktypeService,
              private cycleService: CycleService,
              private authenticationService: AuthenticationService,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.user = this.authenticationService.getProfile();

    this.activatedRoute.params.subscribe((params: Params) => {
      this.eventService.getEvents(params['cell']).subscribe(
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

    this.cycleService.getCycles().subscribe(
      data => {
        const cycles = data.results.map(c => new Cycle(c) );
        for (const cycle of Object.keys(cycles)) {
          this.dropdownCycleList.push(this.cycleToDict(cycles[cycle]));
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

    this.dropdownCycleSettings = {
      singleSelection: false,
      text: 'Choisis ta(tes) période(s)',
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

  private cycleToDict(cycle: Cycle) {
    return {
      'id': cycle.id,
      'itemName': cycle.name,
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
          // If no cycle filter or filter is verified
          if ( this.selectedCycles.length === 0
            || this.elemIsFiltered(this.cycleToDict(this.events[event].cycle), this.selectedCycles)) {
            eventFiltered.push(this.events[event]);
          }
        }
      }
    }

    // If no filters, we take all events
    if (this.selectedCycles.length === 0 && this.selectedTasktypes.length === 0) {
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
