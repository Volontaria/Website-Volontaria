import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminCellComponent } from './admin-cell.component';

describe('MyScheduleComponent', () => {
  let component: AdminCellComponent;
  let fixture: ComponentFixture<AdminCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCellComponent ]
    })
      .compileComponents();
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
