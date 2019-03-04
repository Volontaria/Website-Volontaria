import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MySchedulePageComponent } from './myschedule-page.component';
import { EventService } from 'app/services/event.service';
import { MyModalService } from 'app/services/my-modal/my-modal.service';
import { NotificationsService } from 'angular2-notifications';
import { ParticipationService } from 'app/services/participation.service';
import { UserService } from 'app/services/user.service';

describe('MySchedulePageComponent', () => {
  let component: MySchedulePageComponent;
  let fixture: ComponentFixture<MySchedulePageComponent>;

  beforeEach(async(() => {
    const eventServiceStub: Partial<EventService> = {};
    const notificationsServiceStub: Partial<NotificationsService> = {};
    const participationServiceStub: Partial<ParticipationService> = {};
    const myModalServiceStub: Partial<MyModalService> = {};
    const userServiceStub = jasmine.createSpyObj('UserService', ['getProfile']);
    TestBed.configureTestingModule({
      declarations: [
        MySchedulePageComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        { provide: EventService, useValue: eventServiceStub },
        { provide: ParticipationService, useValue: participationServiceStub },
        { provide: NotificationsService, useValue: notificationsServiceStub },
        { provide: MyModalService, useValue: myModalServiceStub }
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySchedulePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
