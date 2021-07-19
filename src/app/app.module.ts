import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ButtonComponent } from './components/button/button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProfileComponent } from './pages/profile/profile.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PromotionTextComponent } from './components/promotion-text/promotion-text.component';
import { ProfilePasswordComponent } from './pages/profile/profile-password/profile-password.component';
import { ProfileInformationsComponent } from './pages/profile/profile-informations/profile-informations.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { ScheduleSectionComponent } from './pages/schedule/schedule-section/schedule-section.component';
import { ScheduleSectionCardComponent } from './pages/schedule/schedule-section/schedule-section-card/schedule-section-card.component';
import { EventsComponent } from './pages/events/events.component';
import {MatSelectModule} from "@angular/material/select";
import { EventCalendarComponent } from './pages/events/event-calendar/event-calendar.component';
import { EventDetailPreviewComponent } from './pages/events/event-detail-preview/event-detail-preview.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { EventDetailPreviewSectionComponent } from './pages/events/event-detail-preview/event-detail-preview-section/event-detail-preview-section.component';
import { EventDetailListItemComponent } from './pages/events/event-detail-list-item/event-detail-list-item.component';
import { ModalComponent } from './components/modal/modal.component';
import { OpenModalDirective } from './directives/open-modal.directive';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {AuthenticationService} from './services/authentication.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TokenInterceptor} from './interceptors/token.interceptor';
import {CanActivateViaAuthGuard} from './guards/CanActivateViaAuthGuard';
import { CellsComponent } from './pages/cells/cells.component';
import {MatTableModule} from '@angular/material/table';
import {Error401Interceptor} from "./guards/error401.interceptor";
import {Error403Interceptor} from "./guards/error403.interceptor";
import { RegisterConfirmComponent } from './pages/register-confirm/register-confirm.component';
import { CkEditorPageComponent } from './pages/ck-editor-page/ck-editor-page.component';
import { CkeditorContainerComponent } from './components/ckeditor-container/ckeditor-container.component';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {MatButtonModule} from "@angular/material/button";
import { MobileComponent } from './pages/mobile/mobile.component';
import { PromotionMobileComponent } from './components/promotion-mobile/promotion-mobile.component';
import {QRCodeModule} from "angular2-qrcode";
import { LogoutComponent } from './pages/logout/logout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { LeftNavComponent } from './components/left-nav/left-nav.component';
import { MatSidenavModule} from '@angular/material/sidenav';
import { AdminEventsComponent } from './pages/admin-events/admin-events.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ButtonComponent,
    ProfileComponent,
    DefaultLayoutComponent,
    HeaderComponent,
    FooterComponent,
    PromotionTextComponent,
    ProfilePasswordComponent,
    ProfileInformationsComponent,
    ScheduleComponent,
    ScheduleSectionComponent,
    ScheduleSectionCardComponent,
    EventsComponent,
    EventCalendarComponent,
    EventDetailPreviewComponent,
    EventDetailPreviewSectionComponent,
    EventDetailListItemComponent,
    ModalComponent,
    OpenModalDirective,
    CellsComponent,
    RegisterConfirmComponent,
    CkEditorPageComponent,
    CkeditorContainerComponent,
    MobileComponent,
    PromotionMobileComponent,
    LogoutComponent,
    AdminLayoutComponent,
    AdminDashboardComponent,
    LeftNavComponent,
    AdminEventsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatProgressBarModule,
    MatCheckboxModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    CKEditorModule,
    MatButtonModule,
    QRCodeModule,
    MatSidenavModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: Error401Interceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: Error403Interceptor, multi: true },
    FormBuilder,
    AuthenticationService,
    MatSnackBar,
    CanActivateViaAuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
