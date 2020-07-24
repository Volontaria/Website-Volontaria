import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailListItemComponent } from './event-detail-list-item.component';

describe('EventDetailListItemComponent', () => {
  let component: EventDetailListItemComponent;
  let fixture: ComponentFixture<EventDetailListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
