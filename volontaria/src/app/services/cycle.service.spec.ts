import { TestBed, inject } from '@angular/core/testing';

import { CycleService } from './cycle.service';

describe('CycleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CycleService]
    });
  });

  it('should be created', inject([CycleService], (service: CycleService) => {
    expect(service).toBeTruthy();
  }));
});
