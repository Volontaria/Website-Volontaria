import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { UserService } from './services/user.service';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { DocumentationComponent } from './components/pages/documentation/documentation.component'
import { HomepageComponent } from './components/pages/home-page/home-page.component';
import { MySchedulepageComponent } from './components/pages/myschedule-page/myschedule-page.component';
import { ActivitiespageComponent } from './components/pages/activities-page/activities-page.component';
import { InfopageComponent } from './components/pages/info-page/info-page.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './components/pages/notfound-page/notfound-page.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomepageComponent,
    MySchedulepageComponent,
    ActivitiespageComponent,
    InfopageComponent,
    DocumentationComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
