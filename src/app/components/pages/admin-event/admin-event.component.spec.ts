import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminEventComponent } from './admin-event.component';

describe('MyScheduleComponent', () => {
  let component: AdminEventComponent;
  let fixture: ComponentFixture<AdminEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEventComponent ]
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
