import { ReactiveFormsModule } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwlDateTimeModule } from 'ng-pick-datetime';
import { NotificationsService } from 'angular2-notifications';

import { AdminEventComponent } from './admin-event.component';
import { EventService } from 'app/services/event.service';
import { MyModalService } from 'app/services/my-modal/my-modal.service';
import { ParticipationService } from 'app/services/participation.service';

@Component({selector: 'app-my-table', template: ''})
class MyTableStubComponent {
  @Input() data: any;
  @Input() settings: any;
}

@Component({selector: 'app-my-modal', template: ''})
class MyModalStubComponent {
  @Input() button2Label: any;
}

describe('AdminEventComponent', () => {
  let component: AdminEventComponent;
  let fixture: ComponentFixture<AdminEventComponent>;

  beforeEach(async(() => {
    const activatedRouteStub = {
      params: {
        subscribe: () => {}
      }
    };
    const eventServiceStub: Partial<EventService> = {};
    const participationServiceStub: Partial<ParticipationService> = {};
    const notificationsServiceStub: Partial<NotificationsService> = {};
    const myModalServiceStub: Partial<MyModalService> = {};
    const routerStub: Partial<Router> = {};

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        OwlDateTimeModule
      ],
      declarations: [
        AdminEventComponent,
        MyTableStubComponent,
        MyModalStubComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: EventService, useValue: eventServiceStub },
        { provide: ParticipationService, useValue: participationServiceStub },
        { provide: NotificationsService, useValue: notificationsServiceStub },
        { provide: MyModalService, useValue: myModalServiceStub },
        { provide: Router, useValue: routerStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
