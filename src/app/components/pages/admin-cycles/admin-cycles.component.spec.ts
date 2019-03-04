import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationsService } from 'angular2-notifications';

import { AuthenticationService } from '../../../services/authentication.service';
import { CycleService } from '../../../services/cycle.service';
import { MyModalService } from '../../../services/my-modal/my-modal.service';

import { AdminCyclesComponent } from './admin-cycles.component';

@Component({selector: 'app-my-table', template: ''})
class MyTableStubComponent {
  @Input() data: any;
  @Input() settings: any;
}

@Component({selector: 'app-my-modal', template: ''})
class MyModalStubComponent {
  @Input() button2Label: any;
}

describe('AdminCyclesComponent', () => {
  let component: AdminCyclesComponent;
  let fixture: ComponentFixture<AdminCyclesComponent>;

  beforeEach(async(() => {
    const cycleServiceStub = {
      getCycles: () => {
        return {
          subscribe: () => {}
        };
      }
    };
    const myModalServiceStub: Partial<MyModalService> = {};
    const authenticationServiceStub: Partial<AuthenticationService> = {
      isAdmin: () => {
        return false;
      }
    };
    const notificationsServiceStub: Partial<NotificationsService> = {};

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        AdminCyclesComponent,
        MyTableStubComponent,
        MyModalStubComponent
      ],
      providers: [
        { provide: CycleService, useValue: cycleServiceStub },
        { provide: MyModalService, useValue: myModalServiceStub },
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: NotificationsService, useValue: notificationsServiceStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCyclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
