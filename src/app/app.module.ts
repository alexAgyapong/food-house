import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CustomHttpInterceptor } from './custom-http-interceptor';
import { RestaurantDetailsComponent } from './restaurants/restaurant-details/restaurant-details.component';
import { RestaurantListComponent } from './restaurants/restaurant-list/restaurant-list.component';
import { TimingsComponent } from './shared/components/timings/timings.component';
import { ReviewsComponent } from './shared/components/reviews/reviews.component';
import { SharedRestaurantListComponent } from './shared/components/shared-restaurant-list/shared-restaurant-list.component';

// Libraries
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { RatingModule } from 'ng-starrating';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalComponent } from './shared/components/modal/modal.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RestaurantDetailsComponent,
    RestaurantListComponent,
    TimingsComponent,
    ReviewsComponent,
    SharedRestaurantListComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbTypeaheadModule,
    RatingModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
