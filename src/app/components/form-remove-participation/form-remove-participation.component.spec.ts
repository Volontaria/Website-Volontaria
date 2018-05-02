import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRemoveParticipation } from './form-remove-participation.component';

describe('FormRemoveParticipation', () => {
  let component: FormRemoveParticipation;
  let fixture: ComponentFixture<FormRemoveParticipation>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRemoveParticipation ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRemoveParticipation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
