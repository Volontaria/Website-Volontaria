import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MySchedulePageComponent } from './myschedule-page.component';

describe('MyScheduleComponent', () => {
  let component: MySchedulePageComponent;
  let fixture: ComponentFixture<MySchedulePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySchedulePageComponent ]
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
