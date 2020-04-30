import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilePopUpComponent } from './mobile-pop-up.component';

describe('MobilePopUpComponent', () => {
  let component: MobilePopUpComponent;
  let fixture: ComponentFixture<MobilePopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobilePopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobilePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
