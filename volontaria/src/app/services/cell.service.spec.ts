import { TestBed, inject } from '@angular/core/testing';

import { CellService } from './cell.service';

describe('CellService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CellService]
    });
  });

  it('should be created', inject([CellService], (service: CellService) => {
    expect(service).toBeTruthy();
  }));
});
