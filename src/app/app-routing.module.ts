import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import {DefaultLayoutComponent} from "./layouts/default-layout/default-layout.component";
import {AdminLayoutComponent} from "./layouts/admin-layout/admin-layout.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {ScheduleComponent} from "./pages/schedule/schedule.component";
import {EventsComponent} from "./pages/events/events.component";
import {CanActivateViaAuthGuard} from './guards/CanActivateViaAuthGuard';
import {CellsComponent} from './pages/cells/cells.component';
import {RegisterConfirmComponent} from "./pages/register-confirm/register-confirm.component";
import {CkEditorPageComponent} from "./pages/ck-editor-page/ck-editor-page.component";
import {MobileComponent} from "./pages/mobile/mobile.component";
import {LogoutComponent} from "./pages/logout/logout.component";
import {DashboardAdminComponent} from "./pages/dashboard-admin/dashboard-admin.component";


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'register-confirm',
    component: RegisterConfirmComponent,
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'mobile',
        component: MobileComponent,
      },
      {
        path: 'page/:key',
        component: CkEditorPageComponent,
      },
      {
        path: 'cells',
        component: CellsComponent,
        canActivate: [
          CanActivateViaAuthGuard
        ]
      },
      {
        path: 'events/:cellId',
        component: EventsComponent,
        canActivate: [
          CanActivateViaAuthGuard
        ]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [
          CanActivateViaAuthGuard
        ]
      },
      {
        path: 'schedule',
        component: ScheduleComponent,
        canActivate: [
          CanActivateViaAuthGuard
        ]
      },
      {
        path: '',
        redirectTo: '/cells',
        pathMatch: 'full',
        canActivate: [
          CanActivateViaAuthGuard
        ]
      },
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      // {
      //   path: 'email-addresses',
      //   component: EmailAddresses,
      // },
      // {
      //   path: 'applications',
      //   component: ApplicationsComponent,
      // },
      // {
      //   path: 'positions',
      //   component: PositionsComponent,
      // },
      // {
      //   path: 'participations',
      //   component: ParticipationsComponent,
      // },
      // {
      //   path: 'tasks',
      //   component: TasksComponent,
      // },
      {
        path: 'mobile',
        component: MobileComponent,
      },
      {
        path: 'page/:key',
        component: CkEditorPageComponent,
      },
      {
        path: 'cells',
        component: CellsComponent,
        canActivate: [
          CanActivateViaAuthGuard
        ]
      },
      {
        path: 'events/:cellId',
        component: EventsComponent,
        canActivate: [
          CanActivateViaAuthGuard
        ]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [
          CanActivateViaAuthGuard
        ]
      },
      {
        path: 'schedule',
        component: ScheduleComponent,
        canActivate: [
          CanActivateViaAuthGuard
        ]
      },
      {
        path: '',
        redirectTo: '/cells',
        pathMatch: 'full',
        canActivate: [
          CanActivateViaAuthGuard
        ]
      },
    ]
  },
  {
    path: 'dashboard-admin',
    component: DashboardAdminComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
