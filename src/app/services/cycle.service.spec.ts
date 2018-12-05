import {HttpClient} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { CycleService } from './cycle.service';

describe('CycleService', () => {
  beforeEach(() => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [
        CycleService,
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
  });

  it('should be created', () => {
    TestBed.get(CycleService);
  });
});
