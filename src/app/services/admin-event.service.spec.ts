import { TestBed } from '@angular/core/testing';

import { AdminEventService } from './admin-event.service';

describe('AdminEventService', () => {
  let service: AdminEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
