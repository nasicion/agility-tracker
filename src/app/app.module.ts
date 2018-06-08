import { BrowserModule } from '@angular/platform-browser';
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

const appRoutes: Routes = [
  {
    path: 'dog',
    component: DogComponent,
    data: { title: 'Dog List' }
  },
  {
    path: 'dog/:id',
    component: DogDetailComponent,
    data: { title: 'Dog Detail' }
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
    BackButtonComponent
  ],
  imports: [
    BrowserModule,
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
