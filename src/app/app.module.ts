import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { DogComponent } from './dog/dog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DogDetailComponent } from './dog-detail/dog-detail.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { GuideComponent } from './guide/guide.component';
import { GuideDetailComponent } from './guide-detail/guide-detail.component';

const appRoutes: Routes = [
  {
    path: 'dog',
    component: DogComponent,
    data: { title: 'Dogs List' }
  },
  {
    path: 'dog/new',
    component: DogDetailComponent,
    data: { title: 'New Dog' }
  },
  {
    path: 'dog/:id',
    component: DogDetailComponent,
    data: { title: 'Dog Detail' }
  },
  {
    path: 'guide',
    component: GuideComponent,
    data: { title: 'Guides List' }
  },
  {
    path: 'guide/new',
    component: GuideDetailComponent,
    data: { title: 'New Guide' }
  },
  {
    path: 'guide/:id',
    component: GuideDetailComponent,
    data: { title: 'Guide Detail' }
  },
  { path: '',
    component: DashboardComponent
  },
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  declarations: [
    AppComponent,
    DogComponent,
    DashboardComponent,
    NotFoundComponent,
    DogDetailComponent,
    BackButtonComponent,
    GuideComponent,
    GuideDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    NgbModule.forRoot() //Angular Bootstrap
  ],
  providers: [BackButtonComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
