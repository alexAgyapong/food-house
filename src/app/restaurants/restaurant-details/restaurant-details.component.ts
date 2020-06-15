import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { ActivatedRoute } from '@angular/router';
import { Restaurant, Location, NearbyRestaurant } from 'src/app/shared/models/restaurant';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Review } from 'src/app/shared/models/review';
import { SharedService } from './../../shared/services/shared.service';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss']
})
export class RestaurantDetailsComponent implements OnInit {
  restaurantId: number;
  restaurant$: Observable<Restaurant>;
  reviews$: Observable<Review[]>;
  restaurantLocation: Location;
  nearbyRestaurants$: Observable<Restaurant[]>;
  title = 'Nearby restaurants';

  constructor(private restaurantService: RestaurantService,
              private route: ActivatedRoute,
              private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    // this.restaurantId = +this.route.snapshot.paramMap.get('id');
    this.route.paramMap.subscribe(param => {
      this.restaurantId = +param.get('id');
      this.getRestaurantDetails();
      this.getRestaurantReviews();
    });
  }

  private getRestaurantReviews() {
    this.reviews$ = this.restaurantService.getReviews(this.restaurantId)
      .pipe(
        map(res => res.map(x => x.review)),
        tap(data => console.log('reviews', data))
      );
  }

  private getRestaurantDetails() {
    this.restaurant$ = this.restaurantService.getRestaurantDetailsById(this.restaurantId)
      .pipe(
        tap(res => this.restaurantLocation = res.location),
        tap(res => {
          if (res.location) { this.getNearbyRestaurants(res.location.latitude, res.location.longitude); }
        })
      );
  }

  private getNearbyRestaurants(lat: string, lon: string) {
    if (localStorage.getItem('nearbyRestaurants')) {
      console.log('nearby', localStorage.getItem('nearbyRestaurants'));
      const restaurants = JSON.parse(localStorage.getItem('nearbyRestaurants')) as NearbyRestaurant[];
      console.log('nearby object', restaurants);
      this.nearbyRestaurants$ = of(restaurants.map(x => x.restaurant));
    } else {
      this.nearbyRestaurants$ = this.restaurantService.getNearbyRestaurants(lat, lon)
        .pipe(
          map(res => res.map(x => x.restaurant)),
          tap(data => console.log('nearby', data))
        );
    }
  }

  goBack() {
    this.removeStorageItem();
    this.sharedService.back();
  }

  private removeStorageItem() {
    if (localStorage.getItem('nearbyRestaurants')) {
      localStorage.removeItem('nearbyRestaurants');
    }
  }

  seePhotos(url: string) {
    this.sharedService.redirectToExternal(url);
  }
}
