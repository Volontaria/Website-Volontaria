import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionTextComponent } from './promotion-text.component';

describe('PromotionTextComponent', () => {
  let component: PromotionTextComponent;
  let fixture: ComponentFixture<PromotionTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
