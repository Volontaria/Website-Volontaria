import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminCyclesComponent } from './admin-cycles.component';

describe('MyScheduleComponent', () => {
  let component: AdminCyclesComponent;
  let fixture: ComponentFixture<AdminCyclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCyclesComponent ]
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
