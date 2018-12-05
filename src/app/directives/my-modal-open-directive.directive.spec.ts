import { TestBed, inject } from '@angular/core/testing';

import { MyModalOpenDirective } from './my-modal-open-directive.directive';
import { MyModalService } from '../services/my-modal/my-modal.service';

describe('MyModalOpenDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyModalService]
    });
  });

  it('should create an instance', inject([MyModalService], (MyModalService: MyModalService) => {
    const directive = new MyModalOpenDirective(MyModalService);
    expect(directive).toBeTruthy();
  }));
});
