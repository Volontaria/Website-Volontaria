import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { EventService } from './event.service';

describe('EventService', () => {
  beforeEach(() => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [
        EventService,
        { provide: HttpClient, useValue: httpClientSpy },
      ]
    });
  });

  it('should be created', () => {
    TestBed.get(EventService);
  });
});
