import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminCellsComponent } from './admin-cells.component';

describe('MyScheduleComponent', () => {
  let component: AdminCellsComponent;
  let fixture: ComponentFixture<AdminCellsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCellsComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCellsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
