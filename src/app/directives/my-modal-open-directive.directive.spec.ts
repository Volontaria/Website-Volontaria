import { TestBed } from '@angular/core/testing';

import { MyModalOpenDirective } from './my-modal-open-directive.directive';
import { MyModalService } from '../services/my-modal/my-modal.service';

describe('MyModalOpenDirective', () => {
  beforeEach(() => {
    const myModalServiceSpy = jasmine.createSpyObj('MyModalService', ['get']);
    myModalServiceSpy.get.and.returnValue({});
    TestBed.configureTestingModule({
      providers: [
        MyModalOpenDirective,
        { provide: MyModalService, useValue: myModalServiceSpy }
      ]
    });
  });

  it('should create an instance', () => {
    const directive = TestBed.get(MyModalOpenDirective);
    expect(directive).toBeTruthy();
  });
});
