import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailPreviewComponent } from './event-detail-preview.component';

describe('EventDetailPreviewComponent', () => {
  let component: EventDetailPreviewComponent;
  let fixture: ComponentFixture<EventDetailPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
