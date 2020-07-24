import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInformationsComponent } from './profile-informations.component';

describe('ProfileInformationsComponent', () => {
  let component: ProfileInformationsComponent;
  let fixture: ComponentFixture<ProfileInformationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileInformationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
