import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminVolunteersComponent } from "./admin-volunteers.component";

describe('MyScheduleComponent', () => {
  let component: AdminVolunteersComponent;
  let fixture: ComponentFixture<AdminVolunteersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminVolunteersComponent ]
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
