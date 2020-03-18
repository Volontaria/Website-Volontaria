import { Component, OnInit } from '@angular/core';
import {Cell} from '../../../models/cell';
import {CellService} from '../../../services/cell.service';
import {Router} from '@angular/router';
import {Tasktype} from '../../../models/tasktype';
import {TasktypeService} from '../../../services/tasktype.service';
import {AuthenticationService} from '../../../services/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Cycle} from '../../../models/cycle';
import {DateUtil} from '../../../utils/date';
import {NotificationsService} from 'angular2-notifications';
import {MyModalService} from '../../../services/my-modal/my-modal.service';

@Component({
  selector: 'app-admin-tasks',
  templateUrl: './admin-tasks.component.html',
  styleUrls: ['./admin-tasks.component.scss']
})
export class AdminTasksComponent implements OnInit {
  tasks: Tasktype[];

  settings = {
    noDataText: 'Aucun type de tache  pour le moment.',
    addButton: this.authenticationService.isAdmin(),
    columns: [
      {
        name: 'name',
        title: 'Type de tache'
      }
    ]
  };

  taskForm: FormGroup;

  constructor(private taskService: TasktypeService,
              private authenticationService: AuthenticationService,
              private router: Router,
              private notificationService: NotificationsService,
              private formBuilder: FormBuilder,
              private myModalService: MyModalService) {}

  ngOnInit() {
    this.createForm();
    this.refreshList();
  }

  refreshList() {
    this.tasks = null;
    this.taskService.getTasktypes().subscribe(
      data => {
        this.tasks = data.results.map(t => new Tasktype(t));
      }
    );
  }

  createForm() {
    this.taskForm = this.formBuilder.group(
      {
        name: [null, Validators.required],
      },
    )
    ;
  }

  createTask(form: FormGroup) {
    if ( form.valid ) {
      this.taskService.create(form.value).subscribe(
        data => {
          this.myModalService.get('create task').toggle();
          form.reset();
          this.notificationService.success('Création réussie',
            `Le type de tache a été crée`);

          this.refreshList();
        },
        err => {

          let errorMessage = '';
          if (err.error.name) {
            errorMessage += `Name erreur: ${err.error.name[0]},`;
          }

          this.myModalService.get('create task').setErrorMessage(errorMessage);
        }
      );
    }
  }

  toggleModal() {
    const modal = this.myModalService.get('create task');

    if (!modal) {
      console.error('No modal named %s', 'create task');
      return;
    }
    modal.toggle();
  }
}
