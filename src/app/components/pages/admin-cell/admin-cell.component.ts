import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CellService} from '../../../services/cell.service';
import {Cell} from '../../../models/cell';
import {Event} from '../../../models/event';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {EventService} from '../../../services/event.service';
import {CycleService} from '../../../services/cycle.service';
import {Cycle} from '../../../models/cycle';
import {TasktypeService} from '../../../services/tasktype.service';
import {Tasktype} from '../../../models/tasktype';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {MyModalService} from '../../../services/my-modal/my-modal.service';
import {NotificationsService} from 'angular2-notifications';
import {AuthenticationService} from '../../../services/authentication.service';


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

  eventForm: FormGroup;
  cycles: Cycle[];
  tasktypes: Tasktype[];

  constructor(private activatedRoute: ActivatedRoute,
              private eventService: EventService,
              private cellService: CellService,
              private cycleService: CycleService,
              private tasktypeService: TasktypeService,
              private router: Router,
              private notificationService: NotificationsService,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private myModals: MyModalService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.cellService.getCell(params['cellId']).subscribe(
        data => {
          this.cell = data;
          this.get_events();
        }
      );

      this.createForm(params['cellId']);
    });

    this.cycleService.getCycles().subscribe(
      data => {
        const cycles = data.results.map(c => new Cycle(c));
        for (const cycle of Object.keys(cycles)) {
          this.dropdownCycleList.push(this.cycleToDict(cycles[cycle]));
        }
      }
    );

    this.tasktypeService.getTasktypes().subscribe(
      data => {
        const tasktypes = data.results.map(t => new Tasktype(t));
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
      classes: 'admin-cell__actions__filters__filter',
    };

    this.dropdownTasktypeSettings = {
      singleSelection: false,
      text: 'Filtrer par activité',
      selectAllText: 'Toutes',
      unSelectAllText: 'Aucunes',
      classes: 'admin-cell__actions__filters__filter',
    };
  }

  get_events() {
    this.eventService.getEvents(this.cell.id).subscribe(
      data => {
        this.events = data.results.map(e => new Event(e));
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
      if (this.selectedTasktypes.length === 0
        || this.elemIsFiltered(this.tasktypeToDict(this.events[event].task_type), this.selectedTasktypes)) {
        // If no cycle filter or filter is verified
        if (this.selectedCycles.length === 0
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

  createForm(cellId: number) {

    this.getCycles();
    this.getTaskTypes();
    this.eventForm = this.formBuilder.group(
      {
        nb_volunteers_needed: [0, [Validators.required, Validators.min(0)]],
        nb_volunteers_standby_needed: [0, [Validators.min(0)]],
        cell_id: [cellId, Validators.required],
        cycle_id: [null, Validators.required],
        task_type_id: [null, Validators.required],
        start_date: [null, Validators.required],
        end_date: [null, Validators.required]
      },
      {
        validator: this.dateValidator()
      }
    );
  }

  getCycles(): void {
    this.cycleService.getCycles()
      .subscribe(cycles => this.cycles = cycles.results);
  }

  getTaskTypes(): void {
    this.tasktypeService.getTasktypes()
      .subscribe(taskTypes => this.tasktypes = taskTypes.results);
  }

  dateValidator() {
    return (group: FormGroup) => {

      const date_start = group.controls['start_date'];
      const date_end = group.controls['end_date'];

      if (date_start.value && date_end.value && date_start.value >= date_end.value) {
        return date_end.setErrors({
          dateEndBeforeDateStart: true
        });
      }

      if (!date_start.value && date_end.value) {
        return date_start.setErrors({
          dateStartMissing: true
        });
      }

      if (date_start.value && !date_end.value) {
        return date_end.setErrors({
          dateEndMissing: true
        });
      }
    };
  }

  createEvent() {

    if (this.eventForm.valid) {

      this.eventService.createEvent(this.eventForm.value).subscribe(
        data => {
          this.myModals.get('create event').toggle();
          this.eventForm.reset();
          this.notificationService.success('Création réussie',
            `L'event a été créé`);

          this.get_events();
        },
        err => {

          let errorMessage = '';
          if (err.error.nb_volunteers_needed) {
            errorMessage += `nb_volunteers_needed erreur: ${err.error.nb_volunteers_needed[0]},`;
          }
          if (err.error.cycle_id) {
            errorMessage += `cycle_id erreur: ${err.error.cycle_id[0]},`;
          }
          if (err.error.task_type_id) {
            errorMessage += `task_type_id erreur: ${err.error.task_type_id[0]},`;
          }
          if (err.error.start_date) {
            errorMessage += `Start date erreur: ${err.error.start_date[0]},`;
          }
          if (err.error.end_date) {
            errorMessage += `End date erreur: ${err.error.end_date[0]},`;
          }
          if (err.error.non_field_errors) {
            this.eventForm.controls['end_date'].setErrors({
              apiError: err.error.non_field_errors
            });
            errorMessage += `End date erreur: ${err.error.non_field_errors[0]},`;
          }

          this.myModals.get('create event').setErrorMessage(errorMessage);
        }
      );
    }
  }
}
