import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailPreviewSectionComponent } from './event-detail-preview-section.component';

describe('EventDetailPreviewSectionComponent', () => {
  let component: EventDetailPreviewSectionComponent;
  let fixture: ComponentFixture<EventDetailPreviewSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailPreviewSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailPreviewSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
