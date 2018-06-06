import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyHttpInterceptor } from './my-http-interceptor';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { UserService } from './services/user.service';
import { AuthenticationService } from './services/authentication.service';
import { EventService } from './services/event.service';
import { TasktypeService } from './services/tasktype.service';
import { CycleService } from './services/cycle.service';
import { CellService } from './services/cell.service';
import { ParticipationService } from './services/participation.service';
import { CanActivateViaAuthGuard } from './guards/CanActivateViaAuthGuard';
import { CanAccessAdminPanelGuard } from './guards/CanAccessAdminPanelGuard';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { DocumentationComponent } from './components/pages/documentation/documentation.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { MySchedulePageComponent } from './components/pages/myschedule-page/myschedule-page.component';
import { ActivitiesPageComponent } from './components/pages/activities-page/activities-page.component';
import { InfoPageComponent } from './components/pages/info-page/info-page.component';
import { ContactPageComponent } from './components/pages/contact-page/contact-page.component';
import { PageNotFoundComponent } from './components/pages/notfound-page/notfound-page.component';
import { AdminActivityDetailComponent } from './components/pages/admin-activity-detail/admin-activity-detail.component';
import { AdminActivitiesComponent } from './components/pages/admin-activities/admin-activities.component';
import { AdminVolunteersComponent } from './components/pages/admin-volunteers/admin-volunteers.component';
import { AdminCyclesComponent } from './components/pages/admin-cycles/admin-cycles.component';
import { AdminCellsComponent } from './components/pages/admin-cells/admin-cells.component';
import { AdminCellComponent } from './components/pages/admin-cell/admin-cell.component';
import { AdminEventComponent } from './components/pages/admin-event/admin-event.component';
// tslint:disable-next-line:max-line-length
import { ActivityConfirmationComponent } from './components/pages/activities-page/activity-confirmation-page/activity-confirmation-page.component';
import { ManageAccountPageComponent } from './components/pages/manage-account-page/manage-account-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { LogoutPageComponent } from './components/pages/logout-page/logout-page.component';
import { RegisterValidationComponent } from './components/pages/register-validation/register-validation.component';
import { RegisterActivationComponent } from './components/pages/register-activation/register-activation.component';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { PermissionDirective } from './directives/permission.directive';
import { AdminComponent } from './components/pages/admin/admin.component';
import { MyModalOpenDirective } from './directives/my-modal-open-directive.directive';
import { MyModalComponent } from './components/my-modal/my-modal.component';
import { MyModalService } from './services/my-modal/my-modal.service';

import { OwlDateTimeIntl, OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ForgotPasswordComponent } from './components/pages/forgot-password/forgot-password.component';
// tslint:disable-next-line:max-line-length
import { ForgotPasswordConfirmationComponent } from './components/pages/forgot-password-confirmation/forgot-password-confirmation.component';
import { ResetPasswordComponent } from './components/pages/reset-password/reset-password.component';
import { MyTableComponent } from './components/my-table/my-table.component';


const appRoutes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'index',
        component: HomePageComponent,
        canActivate: [
          CanActivateViaAuthGuard
        ]
      },
      {
        path: 'forgot-password/confirmation',
        component: ForgotPasswordConfirmationComponent,
      },
      {
        path: 'activities/:cell',
        component: ActivitiesPageComponent,
        canActivate: [
          CanActivateViaAuthGuard
        ]
      },
      {
        path: 'confirmation/:eventId',
        component: ActivityConfirmationComponent,
        canActivate: [
          CanActivateViaAuthGuard
        ]
      },
      {
        path: 'schedule',
        component: MySchedulePageComponent,
        canActivate: [
          CanActivateViaAuthGuard
        ]
      },
      {
        path: 'info',
        component: InfoPageComponent,
        canActivate: []
      },
      {
        path: 'contact',
        component: ContactPageComponent,
        canActivate: []
      },
      {
        path: 'register',
        component: ManageAccountPageComponent
      },
      {
        path: 'register/validation',
        component: RegisterValidationComponent
      },
      {
        path: 'register/activation/:token',
        component: RegisterActivationComponent
      },
      {
        path: 'logout',
        component: LogoutPageComponent,
        canActivate: [
          CanActivateViaAuthGuard
        ]
      },
      {
        path: 'admin/activities',
        component: AdminActivitiesComponent,
        canActivate: [
          CanActivateViaAuthGuard
        ]
      },
      {
        path: 'admin/activity',
        component: AdminActivityDetailComponent,
        canActivate: [
          CanActivateViaAuthGuard
        ]
      },
      {
        path: 'docs',
        component: DocumentationComponent,
        canActivate: [
          CanActivateViaAuthGuard
        ]
      },
      {
        path: '',
        redirectTo: '/index',
        pathMatch: 'full',
        canActivate: [
          CanActivateViaAuthGuard
        ]
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [
          CanActivateViaAuthGuard,
          CanAccessAdminPanelGuard
        ]
      },
      {
        path: 'admin/volunteers',
        component: AdminVolunteersComponent,
        canActivate: [
          CanActivateViaAuthGuard,
          CanAccessAdminPanelGuard
        ]
      },
      {
        path: 'admin/cycles',
        component: AdminCyclesComponent,
        canActivate: [
          CanActivateViaAuthGuard,
          CanAccessAdminPanelGuard
        ]
      },
      {
        path: 'admin/cells',
        component: AdminCellsComponent,
        canActivate: [
          CanActivateViaAuthGuard,
          CanAccessAdminPanelGuard
        ]
      },
      {
        path: 'admin/cells/:cellId',
        component: AdminCellComponent,
        canActivate: [
          CanActivateViaAuthGuard,
          CanAccessAdminPanelGuard
        ]
      },
      {
        path: 'admin/events/:eventId',
        component: AdminEventComponent,
        canActivate: [
          CanActivateViaAuthGuard,
          CanAccessAdminPanelGuard
        ]
      },
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginPageComponent
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'reset-password/:token',
        component: ResetPasswordComponent,
      },
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

export class DefaultIntl {
  upSecondLabel = 'Ajouter une seconde';
  downSecondLabel = 'Retirer une seconde';
  upMinuteLabel = 'Ajouter une minute';
  downMinuteLabel = 'Retirer une minute';
  upHourLabel = 'Ajouter une heure';
  downHourLabel = 'Retirer une heure';
  prevMonthLabel = 'Mois précédent';
  nextMonthLabel = 'Mois suivant';
  prevYearLabel = 'Année précédente';
  nextYearLabel = 'Année suivante';
  prevMultiYearLabel = 'Les 21 années précédentes';
  nextMultiYearLabel = 'Les 21 prochaines années';
  switchToMonthViewLabel = 'Changer pour la vue par mois';
  switchToMultiYearViewLabel = 'Changer la vue pour l\'année et le mois';
  cancelBtnLabel = 'Annuler';
  setBtnLabel = 'Confirmer';
  rangeFromLabel = 'Depuis';
  rangeToLabel = 'Jusqu\'au';
  hour12AMLabel = 'AM';
  hour12PMLabel = 'PM';
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomePageComponent,
    MySchedulePageComponent,
    ActivitiesPageComponent,
    ManageAccountPageComponent,
    RegisterValidationComponent,
    RegisterActivationComponent,
    LoginPageComponent,
    LogoutPageComponent,
    ActivityConfirmationComponent,
    AdminVolunteersComponent,
    AdminCyclesComponent,
    AdminCellsComponent,
    AdminCellComponent,
    AdminEventComponent,
    AdminActivitiesComponent,
    AdminActivityDetailComponent,
    InfoPageComponent,
    ContactPageComponent,
    DocumentationComponent,
    PageNotFoundComponent,
    AdminLayoutComponent,
    DefaultLayoutComponent,
    LoginLayoutComponent,
    PermissionDirective,
    AdminComponent,
    MyModalOpenDirective,
    MyModalComponent,
    MyTableComponent,
    ForgotPasswordComponent,
    ForgotPasswordConfirmationComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    FormsModule,
    ReactiveFormsModule,
    SimpleNotificationsModule.forRoot(),
    AngularMultiSelectModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  exports: [ RouterModule ],
  providers: [
    UserService,
    AuthenticationService,
    EventService,
    TasktypeService,
    CycleService,
    CellService,
    ParticipationService,
    CanActivateViaAuthGuard,
    CanAccessAdminPanelGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptor,
      multi: true,
    },
    {provide: OwlDateTimeIntl, useClass: DefaultIntl},
    MyModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
