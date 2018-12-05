import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from 'app/services/authentication.service';

import { ParticipationService } from './participation.service';

describe('ParticipationService', () => {
  beforeEach(() => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    const authenticationServiceSpy = jasmine.createSpyObj('AuthenticationService', ['getProfile']);
    TestBed.configureTestingModule({
      providers: [
        ParticipationService,
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: AuthenticationService, useValue: authenticationServiceSpy }
      ]
    });
  });

  it('should be created', () => {
    TestBed.get(ParticipationService);
  });
});
