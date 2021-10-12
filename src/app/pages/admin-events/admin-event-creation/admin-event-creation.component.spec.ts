import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEventCreationComponent } from './admin-event-creation.component';

describe('AdminEventCreationComponent', () => {
  let component: AdminEventCreationComponent;
  let fixture: ComponentFixture<AdminEventCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEventCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEventCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
