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

import {OwlDateTimeModule, OwlNativeDateTimeModule, OwlDateTimeIntl, OWL_DATE_TIME_LOCALE} from 'ng-pick-datetime';

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
        path: 'activities/:cycle',
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
        canActivate: [
          CanActivateViaAuthGuard
        ]
      },
      {
        path: 'contact',
        component: ContactPageComponent,
        canActivate: [
          CanActivateViaAuthGuard
        ]
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
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

export class DatePickerFr  {
  /** A label for the up second button (used by screen readers).  */
  upSecondLabel = 'Ajouter une seconde';
  /** A label for the down second button (used by screen readers).  */
  downSecondLabel = 'Enlever une seconde';
  /** A label for the up minute button (used by screen readers).  */
  upMinuteLabel = 'Ajouter une minute';
  /** A label for the down minute button (used by screen readers).  */
  downMinuteLabel = 'Enlever une minute';
  /** A label for the up hour button (used by screen readers).  */
  upHourLabel = 'Ajouter une heure';
  /** A label for the down hour button (used by screen readers).  */
  downHourLabel = 'Enlever une heure';
  /** A label for the previous month button (used by screen readers). */
  prevMonthLabel = 'Mois précédant';
  /** A label for the next month button (used by screen readers). */
  nextMonthLabel = 'Mois prochain';
  /** A label for the previous year button (used by screen readers). */
  prevYearLabel = 'Année précédante';
  /** A label for the next year button (used by screen readers). */
  nextYearLabel = 'Année prochaine';
  /** A label for the previous multi-year button (used by screen readers). */
  prevMultiYearLabel = 'Les pécédantes 21 années';
  /** A label for the next multi-year button (used by screen readers). */
  nextMultiYearLabel = 'Les prochaines 21 années';
  /** A label for the 'switch to month view' button (used by screen readers). */
  switchToMonthViewLabel = 'Changer pour la vue par mois';
  /** A label for the 'switch to year view' button (used by screen readers). */
  switchToMultiYearViewLabel = 'Choisir un mois et une année';
  /** A label for the cancel button */
  cancelBtnLabel = 'Annuler';
  /** A label for the set button */
  setBtnLabel = 'Valider';
  /** A label for the range 'from' in picker info */
  rangeFromLabel = 'Depuis';
  /** A label for the range 'to' in picker info */
  rangeToLabel = 'jusqu\'au';
  /** A label for the hour12 button (AM) */
  hour12AMLabel = 'AM';
  /** A label for the hour12 button (PM) */
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
    MyModalComponent
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
    OwlNativeDateTimeModule
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
    MyModalService,
    // use french locale
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'fr'},
    {provide: OwlDateTimeIntl, useClass: DatePickerFr},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
