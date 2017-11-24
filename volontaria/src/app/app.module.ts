import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { UserService } from './services/user.service';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { DocumentationComponent } from './components/pages/documentation/documentation.component'
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { MySchedulePageComponent } from './components/pages/myschedule-page/myschedule-page.component';
import { ActivitiesPageComponent } from './components/pages/activities-page/activities-page.component';
import { InfoPageComponent } from './components/pages/info-page/info-page.component';
import { PageNotFoundComponent } from './components/pages/notfound-page/notfound-page.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

const appRoutes = [
  { path: 'index', component: HomePageComponent },
  { path: 'activities', component: ActivitiesPageComponent},
  { path: 'schedule', component: MySchedulePageComponent},
  { path: 'info', component: InfoPageComponent},
  { path: 'docs', component: DocumentationComponent },
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomePageComponent,
    MySchedulePageComponent,
    ActivitiesPageComponent,
    InfoPageComponent,
    DocumentationComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  exports: [ RouterModule ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
