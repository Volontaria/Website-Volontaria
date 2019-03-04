import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { PermissionDirective } from 'app/directives/permission.directive';
import { AuthenticationService } from 'app/services/authentication.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    const authenticationServiceSpy = jasmine.createSpyObj('AuthenticationService', ['isAuthenticated', 'hasPermissions']);
    authenticationServiceSpy.isAuthenticated.and.returnValue(true);
    authenticationServiceSpy.hasPermissions.and.returnValue(true);
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        PermissionDirective
      ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('can be instantiated', () => {
    expect(component).toBeTruthy();
  });
});
