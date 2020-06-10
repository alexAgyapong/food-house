import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RestaurantListComponent } from './restaurants/restaurant-list/restaurant-list.component';
import { RestaurantDetailsComponent } from './restaurants/restaurant-details/restaurant-details.component';


const routes: Routes = [
  {
    path: 'restaurant',
    children: [
      { path: '', component: RestaurantListComponent },
      { path: 'details/:id', component: RestaurantDetailsComponent }
    ]
  },
  { path: '', component: HomeComponent }
  // { path: '', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
