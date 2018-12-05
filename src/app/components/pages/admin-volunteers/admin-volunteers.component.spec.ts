import { FormsModule } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVolunteersComponent } from './admin-volunteers.component';
import { UserService } from 'app/services/user.service';

@Component({selector: 'app-my-table', template: ''})
class MyTableStubComponent {
  @Input() data: any;
  @Input() settings: any;
}

describe('AdminVolunteersComponent', () => {
  let component: AdminVolunteersComponent;
  let fixture: ComponentFixture<AdminVolunteersComponent>;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(async(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    const userServiceStub: UserService = new UserService(<any> httpClientSpy);
    const routerStub: Partial<Router> = {};

    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        AdminVolunteersComponent,
        MyTableStubComponent
      ],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        { provide: Router, useValue: routerStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVolunteersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
