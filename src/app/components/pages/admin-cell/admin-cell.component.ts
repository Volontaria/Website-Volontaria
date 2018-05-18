import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CellService } from '../../../services/cell.service';
import { Cell } from '../../../models/cell';
import { Event } from '../../../models/event';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { CycleService } from '../../../services/cycle.service';
import { Cycle } from '../../../models/cycle';
import { TasktypeService } from '../../../services/tasktype.service';
import { Tasktype } from '../../../models/tasktype';


@Component({
  selector: 'app-admin-cell',
  templateUrl: './admin-cell.component.html',
  styleUrls: ['admin-cell.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminCellComponent implements OnInit {

  cell: Cell;
  events: Event[];

  filteredEvents: Event[];

  dropdownTasktypeList = [];
  selectedTasktypes = [];
  dropdownTasktypeSettings = {};

  dropdownCycleList = [];
  selectedCycles = [];
  dropdownCycleSettings = {};

  constructor(private activatedRoute: ActivatedRoute,
              private eventService: EventService,
              private cellService: CellService,
              private cycleService: CycleService,
              private tasktypeService: TasktypeService,
              private router: Router) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.cellService.getCell(params['cellId']).subscribe(
        data => {
          this.cell = data;
          this.get_events();
        }
      );
    });

    this.cycleService.getCycles().subscribe(
      data => {
        const cycles = data.results.map(c => new Cycle(c) );
        for (const cycle of Object.keys(cycles)) {
          this.dropdownCycleList.push(this.cycleToDict(cycles[cycle]));
        }
      }
    );

    this.tasktypeService.getTasktypes().subscribe(
      data => {
        const tasktypes = data.results.map(t => new Tasktype(t) );
        for (const tasktype of Object.keys(tasktypes)) {
          this.dropdownTasktypeList.push(this.tasktypeToDict(tasktypes[tasktype]));
        }
      }
    );

    this.dropdownCycleSettings = {
      singleSelection: false,
      text: 'Filtrer par cycle',
      selectAllText: 'Tous',
      unSelectAllText: 'Aucun',
      classes: 'admin-cell__filters__filter',
    };

    this.dropdownTasktypeSettings = {
      singleSelection: false,
      text: 'Filtrer par activité',
      selectAllText: 'Toutes',
      unSelectAllText: 'Aucunes',
      classes: 'admin-cell__filters__filter',
    };
  }

  get_events() {
    this.eventService.getEvents(this.cell.id).subscribe(
      data => {
        this.events = data.results.map(e => new Event(e) );
        this.filter();
      }
    );
  }

  visitEvent(idEvent) {
    this.router.navigate(['/admin/events/' + idEvent]);
  }

  private cycleToDict(cycle: Cycle) {
    return {
      'id': cycle.id,
      'itemName': cycle.name,
    };
  }

  private tasktypeToDict(tasktype: Tasktype) {
    return {
      'id': tasktype.id,
      'itemName': tasktype.name,
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

    // If no filters, we take all events
    if (this.selectedCycles.length === 0 && this.selectedTasktypes.length === 0) {
      for (const event in this.events) {
        if (event) {
          this.filteredEvents.push(this.events[event]);
        }
      }
    } else {
      this.filteredEvents = eventFiltered;
    }
  }

  export_link_pressed(event: any) {
    event.preventDefault();

    this.cellService.getExportCell(this.cell.id).subscribe(
        data => {
          window.location.assign(this.cellService.getExportCellLink(data.export_link));
        }
      );
  }
}
