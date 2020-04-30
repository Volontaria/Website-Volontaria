import { TestBed, inject } from '@angular/core/testing';

import { PopUpMobileService } from './pop-up-mobile.service';

describe('PopUpMobileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PopUpMobileService]
    });
  });

  it('should be created', inject([PopUpMobileService], (service: PopUpMobileService) => {
    expect(service).toBeTruthy();
  }));
});
