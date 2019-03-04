import {HttpClient} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { CellService } from './cell.service';

describe('CellService', () => {
  beforeEach(() => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [
        CellService,
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
  });

  it('should be created', () => {
    TestBed.get(CellService);
  });
});
