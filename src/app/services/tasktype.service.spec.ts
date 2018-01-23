import { TestBed, inject } from '@angular/core/testing';

import { TasktypeService } from './tasktype.service';

describe('TasktypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TasktypeService]
    });
  });

  it('should be created', inject([TasktypeService], (service: TasktypeService) => {
    expect(service).toBeTruthy();
  }));
});
