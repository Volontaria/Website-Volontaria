import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwlDateTimeModule } from 'ng-pick-datetime';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NotificationsService } from 'angular2-notifications';

import { AuthenticationService } from '../../../services/authentication.service';
import { CellService } from '../../../services/cell.service';
import { CycleService } from '../../../services/cycle.service';
import { EventService } from '../../../services/event.service';
import { MyModalService } from '../../../services/my-modal/my-modal.service';
import { TasktypeService } from '../../../services/tasktype.service';

import { AdminCellComponent } from './admin-cell.component';

@Component({selector: 'app-my-table', template: ''})
class MyTableStubComponent {
  @Input() data: any;
  @Input() settings: any;
}

@Component({selector: 'app-my-modal', template: ''})
class MyModalStubComponent {
  @Input() button2Label: any;
}

describe('AdminCellComponent', () => {
  let component: AdminCellComponent;
  let fixture: ComponentFixture<AdminCellComponent>;

  beforeEach(async(() => {
    const activatedRouteStub = {
      params: {
        subscribe: () => {}
      }
    };
    const eventServiceStub: Partial<EventService> = {};
    const cellServiceStub: Partial<CellService> = {};
    const cycleServiceStub = {
      getCycles: () => {
        return {
          subscribe: () => {}
        };
      }
    };
    const tasktypeServiceStub = {
      getTasktypes: () => {
        return {
          subscribe: () => {}
        };
      }
    };
    const routerStub: Partial<Router> = {};
    const notificationsServiceStub: Partial<NotificationsService> = {};
    const authenticationServiceStub: Partial<AuthenticationService> = {};
    const myModalServiceStub: Partial<MyModalService> = {};

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        AngularMultiSelectModule,
        OwlDateTimeModule
      ],
      declarations: [
        AdminCellComponent,
        MyTableStubComponent,
        MyModalStubComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: EventService, useValue: eventServiceStub },
        { provide: CellService, useValue: cellServiceStub },
        { provide: CycleService, useValue: cycleServiceStub },
        { provide: TasktypeService, useValue: tasktypeServiceStub },
        { provide: Router, useValue: routerStub },
        { provide: NotificationsService, useValue: notificationsServiceStub },
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: MyModalService, useValue: myModalServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
