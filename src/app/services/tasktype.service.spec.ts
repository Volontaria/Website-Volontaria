import {HttpClient} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { TasktypeService } from './tasktype.service';

describe('TasktypeService', () => {
  beforeEach(() => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [
        TasktypeService,
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
  });

  it('should be created', () => {
    TestBed.get(TasktypeService);
  });
});
