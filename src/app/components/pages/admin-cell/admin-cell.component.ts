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
import {FormBuilder, FormGroup, NgForm, RequiredValidator, Validators} from '@angular/forms';
import {MyModalService} from '../../../services/my-modal/my-modal.service';
import {NotificationsService} from 'angular2-notifications';
import {AuthenticationService} from '../../../services/authentication.service';
import {DateUtil} from '../../../utils/date';
import {isUndefined} from 'util';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


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
  emailForm: FormGroup;
  emailFormSubmitted: boolean;

  nbVolunteerSelected: number;

  cycles: Cycle[];
  tasktypes: Tasktype[];

  selectedCycle: Cycle;

  settings = {
    title: 'Liste des plages horaires',
    noDataText: 'Aucune plage horaire',
    clickable: true,
    addButton: true,
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
  modalButton: string;
  modalEventId: number;

  public Editor = ClassicEditor;

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
          this.cell = new Cell(data);
          this.get_events();
          this.initForm();
        }
      );

      this.getCycles();
      this.getTaskTypes();
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

    this.initEmailForm();
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
    this.nbVolunteerSelected = 0;
    let volunteerSelected = [];

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

    // find the number of selected volunteers for validations
    for (const event in this.eventsAdaptedFiltered) {
        if (event) {
          volunteerSelected = volunteerSelected.concat(this.eventsAdapted[event].model.volunteers);
        }
      }
    this.nbVolunteerSelected = new Set(volunteerSelected).size;
    this.emailForm.controls['nbVolunteers'].setValue(this.nbVolunteerSelected);
  }

  export_link_pressed(event: any) {
    event.preventDefault();

    let cycles = [];
    for (let i=0; i!= this.selectedCycles.length; ++i) {
      cycles.push(this.selectedCycles[i]['id']);
    }

    let tasks = [];
    for (let i=0; i!= this.selectedTasktypes.length; ++i) {
      tasks.push(this.selectedTasktypes[i]['id']);
    }

    this.cellService.getExportCell(this.cell.id, cycles, tasks).subscribe(
      data => {
        window.location.assign(this.cellService.getExportCellLink(data.export_link));
      }
    );
  }

  initForm() {
    this.eventForm = this.formBuilder.group(
      {
        nb_volunteers_needed: [null, [Validators.min(0)]],
        nb_volunteers_standby_needed: [null, [Validators.min(0)]],
        cell_id: [this.cell.id],
        cycle_id: [null],
        task_type_id: [null],
        start_date: [null],
        end_date: [null]
      },
      {
        validator: this.dateValidator()
      }
    );
  }

  initEmailForm() {
    this.emailFormSubmitted = false;

    this.emailForm = this.formBuilder.group(
      {
        nbVolunteers: [null, Validators.min(1)],
        subject: [null, Validators.required],
        content: [null, Validators.required]
      }
    );

    this.emailForm.controls['nbVolunteers'].setValue(0);
  }

  openEmailForm(event: any) {
    this.toggleModal('custom_email');
    this.emailForm.controls['nbVolunteers'].setValue(this.nbVolunteerSelected);
  }

  sendEmail(event: any) {
    //event.preventDefault();

    this.emailFormSubmitted = true;

    // if (this.nbVolunteerSelected == 0) {
    //   this.eventForm.setErrors({
    //     apiError: "Il n'y a Pas de participants avec la sélection actuelle"
    //   });
    //   return;
    // }

    if (this.emailForm.controls['subject'].value &&
        this.emailForm.controls['content'].value &&
        this.emailForm.controls['nbVolunteers'].value > 0) {

      let cycles = [];
      for (let i = 0; i != this.selectedCycles.length; ++i) {
        cycles.push(this.selectedCycles[i]['id']);
      }

      let tasks = [];
      for (let i = 0; i != this.selectedTasktypes.length; ++i) {
        tasks.push(this.selectedTasktypes[i]['id']);
      }

      this.cellService.getEmailCell(
        this.cell.id,
        this.emailForm.controls['subject'].value,
        this.emailForm.controls['content'].value,
        cycles, tasks).subscribe(
        data => {
          this.notificationService.success('Succès !', "L'envoi d'un courriel au(x) Participant(s) à fonctionné");
        },
      err => {
        this.notificationService.error('Échec',
          `L'envoi d'un courriel au(x) Participant(s) à échoué`);
      }
      );
    }
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
          this.notificationService.success('Création réussie', `La plage horaire a été créé`);
          this.get_events();
        },
        err => {

          if (err.error.nb_volunteers_needed) {
            this.eventForm.controls['nb_volunteers_needed'].setErrors({
              apiError: err.error.nb_volunteers_needed
            });
          }
          if (err.error.nb_volunteers_standby_needed) {
            this.eventForm.controls['nb_volunteers_standby_needed'].setErrors({
              apiError: err.error.nb_volunteers_standby_needed
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
          if (err.error.nb_volunteers_standby_needed) {
            this.eventForm.controls['nb_volunteers_standby_needed'].setErrors({
              apiError: err.error.nb_volunteers_standby_needed
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

  submitFormEvent() {
    if (isUndefined(this.modalEventId)) {
      this.createEvent();
    } else {
      this.updateEvent(this.modalEventId);
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
    this.modalButton = 'Créer la plage horaire';
    this.modalEventId = undefined;
    this.initForm();
    this.toggleModal('event modal');
  }

  openModalEditEvent(event) {
    this.modalTitle = 'Modification d\'une plage horaire';
    this.modalButton = 'Modifier la plage horaire';
    this.modalEventId = event.model.id;
    this.initForm();

    this.eventForm.controls['nb_volunteers_needed'].setValue(event.model.nb_volunteers_needed);
    this.eventForm.controls['nb_volunteers_standby_needed'].setValue(event.model.nb_volunteers_standby_needed);
    this.eventForm.controls['cycle_id'].setValue(event.model.cycle.id);
    this.eventForm.controls['task_type_id'].setValue(event.model.task_type.id);
    this.eventForm.controls['start_date'].setValue(event.model.start_date);
    this.eventForm.controls['end_date'].setValue(event.model.end_date);
    this.selectedCycle = event.model.cycle.id;

    this.toggleModal('event modal');
  }

  toggleModal(name) {
    const modal = this.myModalService.get(name);

    if (!modal) {
      console.error('No modal named %s', 'event modal');
      return;
    }
    modal.toggle();
  }
}
