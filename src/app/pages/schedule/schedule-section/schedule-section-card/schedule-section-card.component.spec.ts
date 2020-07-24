import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleSectionCardComponent } from './schedule-section-card.component';

describe('ScheduleSectionCardComponent', () => {
  let component: ScheduleSectionCardComponent;
  let fixture: ComponentFixture<ScheduleSectionCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleSectionCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleSectionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
