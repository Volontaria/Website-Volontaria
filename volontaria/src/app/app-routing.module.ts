import { RouterModule} from '@angular/router';
import { HomepageComponent } from './components/pages/home-page/home-page.component';
import { DocumentationComponent } from './components/pages/documentation/documentation.component';
import { PageNotFoundComponent } from './components/pages/notfound-page/notfound-page.component';
import { MySchedulepageComponent } from './components/pages/myschedule-page/myschedule-page.component';
import { ActivitiespageComponent } from './components/pages/activities-page/activities-page.component';
import { NgModule } from '@angular/core';
import { InfopageComponent } from './components/pages/info-page/info-page.component';

const appRoutes = [
  { path: 'index', component: HomepageComponent },
  { path: 'activities', component: ActivitiespageComponent},
  { path: 'schedule', component: MySchedulepageComponent},
  { path: 'info', component: InfopageComponent},
  { path: 'docs', component: DocumentationComponent },
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
