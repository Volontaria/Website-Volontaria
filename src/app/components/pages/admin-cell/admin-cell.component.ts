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
import {Address} from '../../../models/address';
import {DateUtil} from "../../../utils/date";


@Component({
  selector: 'app-admin-cell',
  templateUrl: './admin-cell.component.html',
  styleUrls: ['admin-cell.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminCellComponent implements OnInit {

  cell: Cell;
  events: Event[];
  eventsAdapted: any[];
  eventsAdaptedFiltered: Event[];

  dropdownTasktypeList = [];
  selectedTasktypes = [];
  dropdownTasktypeSettings = {};

  dropdownCycleList = [];
  selectedCycles = [];
  dropdownCycleSettings = {};

  eventForm: FormGroup;
  cycles: Cycle[];
  tasktypes: Tasktype[];

  selectedCycle: Cycle;

  saveForm;

  settings = {
    editButton: true,
    columns: [
      {
        name: 'start_date',
        title: 'Début'
      },
      {
        name: 'end_date',
        title: 'Fin'
      },
      {
        name: 'task_type',
        title: 'Activité'
      },
      {
        name: 'volunteers',
        title: 'Bénévoles'
      },
      {
        name: 'stand_by',
        title: 'Remplaçants'
      }
    ]
  };

  modalTitle: string;
  modalEventId: number;

  constructor(private activatedRoute: ActivatedRoute,
              private eventService: EventService,
              private cellService: CellService,
              private cycleService: CycleService,
              private tasktypeService: TasktypeService,
              private router: Router,
              private notificationService: NotificationsService,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private myModalService: MyModalService) {
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
    this.eventService.getEvents([{name: 'cell', value: this.cell.id}]).subscribe(
      data => {
        this.events = data.results.map(e => new Event(e));
        this.eventsAdapted = this.eventsAdapter();
        this.filter();
      }
    );
  }

  visitEvent(event: Event) {
    this.router.navigate(['/admin/events/' + event.id]);
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
    this.eventsAdaptedFiltered = [];
    const eventFiltered = [];

    for (const event in this.eventsAdapted) {
      // If no task_type filter or filter is verified
      if (this.selectedTasktypes.length === 0
        || this.elemIsFiltered(this.tasktypeToDict(this.eventsAdapted[event].model.task_type), this.selectedTasktypes)) {
        // If no cycle filter or filter is verified
        if (this.selectedCycles.length === 0
          || this.elemIsFiltered(this.cycleToDict(this.eventsAdapted[event].model.cycle), this.selectedCycles)) {
          eventFiltered.push(this.eventsAdapted[event]);
        }
      }
    }

    // If no filters, we take all events
    if (this.selectedCycles.length === 0 && this.selectedTasktypes.length === 0) {
      for (const event in this.eventsAdapted) {
        if (event) {
          this.eventsAdaptedFiltered.push(this.eventsAdapted[event]);
        }
      }
    } else {
      this.eventsAdaptedFiltered = eventFiltered;
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

    this.saveForm = this.eventForm.value;
  }

  resetForm() {
    this.eventForm.reset(this.saveForm);
    for (const controlKey of Object.keys(this.eventForm.controls)) {
      this.eventForm.controls[controlKey].markAsUntouched();
    }
    this.selectedCycle = null;
  }

  setSelectedCycle() {
    this.selectedCycle = null;
    for (const cycle of this.cycles) {
      if (cycle.id === this.eventForm.controls['cycle_id'].value) {
        this.selectedCycle = cycle;
      }
    }
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
          dateEndBeforeDateStart: 'La fin de la plage horaire doit être après le début de la plage horaire.'
        });
      }

      if (!date_start.value && date_end.value) {
        return date_start.setErrors({
          dateStartMissing: 'Début de la plage horaire nécessaire.'
        });
      }

      if (date_start.value && !date_end.value) {
        return date_end.setErrors({
          dateEndMissing: 'Fin de la plage horaire nécessaire.'
        });
      }
    };
  }

  createEvent() {
    this.eventService.createEvent(this.eventForm.value).subscribe(
        data => {
          this.myModalService.get('event modal').toggle();
          this.resetForm();
          this.notificationService.success('Création réussie',
            `La plage horaire a été créé`);

          this.get_events();
        },
        err => {

          if (err.error.nb_volunteers_needed) {
            this.eventForm.controls['nb_volunteers_needed'].setErrors({
              apiError: err.error.nb_volunteers_needed
            });
          }
          if (err.error.cycle_id) {
            this.eventForm.controls['cycle_id'].setErrors({
              apiError: err.error.cycle_id
            });
          }
          if (err.error.task_type_id) {
            this.eventForm.controls['task_type_id'].setErrors({
              apiError: err.error.task_type_id
            });
          }
          if (err.error.start_date) {
            this.eventForm.controls['start_date'].setErrors({
              apiError: err.error.start_date
            });
          }
          if (err.error.end_date) {
            this.eventForm.controls['end_date'].setErrors({
              apiError: err.error.end_date
            });
          }
          if (err.error.non_field_errors) {
            this.eventForm.setErrors({
              apiError: err.error.non_field_errors
            });
          }
        }
      );
  }

  updateEvent(eventId: number) {
    this.eventService.updateEvent(eventId, this.eventForm.value).subscribe(
        data => {
          this.myModalService.get('event modal').toggle();
          this.resetForm();
          this.notificationService.success('Modification réussie',
            `La plage horaire a été modifiée`);

          this.get_events();
        },
        err => {

          if (err.error.nb_volunteers_needed) {
            this.eventForm.controls['nb_volunteers_needed'].setErrors({
              apiError: err.error.nb_volunteers_needed
            });
          }
          if (err.error.cycle_id) {
            this.eventForm.controls['cycle_id'].setErrors({
              apiError: err.error.cycle_id
            });
          }
          if (err.error.task_type_id) {
            this.eventForm.controls['task_type_id'].setErrors({
              apiError: err.error.task_type_id
            });
          }
          if (err.error.start_date) {
            this.eventForm.controls['start_date'].setErrors({
              apiError: err.error.start_date
            });
          }
          if (err.error.end_date) {
            this.eventForm.controls['end_date'].setErrors({
              apiError: err.error.end_date
            });
          }
          if (err.error.non_field_errors) {
            this.eventForm.setErrors({
              apiError: err.error.non_field_errors
            });
          }
        }
      );
  }

  operationsEvent() {

    if (this.eventForm.valid) {
      if (this.modalEventId) {
        this.createEvent();
      } else {
        this.updateEvent(this.modalEventId);
      }

    } else {
      for (const controlKey of Object.keys(this.eventForm.controls)) {
        this.eventForm.controls[controlKey].markAsTouched();
      }
    }
  }

  eventsAdapter() {
    const eventsAdapted = [];
    for (const event of this.events) {
      const newEvent = {
        id: event.id,
        start_date: DateUtil.completeDate(event.start_date),
        end_date: DateUtil.completeDate(event.end_date),
        task_type: event.task_type.name,
        volunteers: event.getVolunteersField(),
        stand_by: event.getStandByField(),
        model: event
      };
      eventsAdapted.push(newEvent);
    }
    return eventsAdapted;
  }

  openModalCreateEvent() {
    this.modalTitle = 'Création d\'une plage horaire';
    this.modalEventId = undefined;
    this.toogleModal();
  }

  openModalEditEvent(event) {

    this.modalTitle = 'Modification d\'une plage horaire';
    this.modalEventId = event.model.id;

    this.eventForm.controls['nb_volunteers_needed'].setValue(event.model.nb_volunteers_needed);
    this.eventForm.controls['nb_volunteers_standby_needed'].setValue(event.model.nb_volunteers_standby_needed);
    this.eventForm.controls['cycle_id'].setValue(event.model.cycle.id);
    this.eventForm.controls['task_type_id'].setValue(event.model.task_type.id);
    this.eventForm.controls['start_date'].setValue(event.model.start_date);
    this.eventForm.controls['end_date'].setValue(event.model.end_date);
    this.selectedCycle = event.model.cycle.id;

    this.toogleModal();
  }

  toogleModal() {
    const modal = this.myModalService.get('event modal');

    if (!modal) {
      console.error('No modal named %s', 'event modal');
      return;
    }
    modal.toggle();
  }
}
