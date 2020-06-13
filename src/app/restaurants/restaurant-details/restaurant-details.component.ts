import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { ActivatedRoute } from '@angular/router';
import { RequestOption, Restaurant, FilteredRestaurant, Location, NearbyRestaurant } from 'src/app/shared/models/restaurant';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserReview, Review } from 'src/app/shared/models/review';
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
    this.nearbyRestaurants$ = this.restaurantService.getNearbyRestaurants(lat, lon)
      .pipe(
        map(res => res.map(x => x.restaurant)),
        tap(data => console.log('nearby', data))
      );
  }

  goBack() {
    this.sharedService.back();
  }

  seePhotos(url: string) {
    this.sharedService.redirectToExternal(url);
  }
}
