import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { ActivatedRoute } from '@angular/router';
import { RequestOption, Restaurant, FilteredRestaurant } from 'src/app/shared/models/restaurant';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { UserReview, Review } from 'src/app/shared/models/review';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss']
})
export class RestaurantDetailsComponent implements OnInit {
  restaurantId: number;
  restaurant$: Observable<Restaurant>;
  reviews$: Observable<Review[]>;
  // reviews$: Observable<UserReview[]>;
  constructor(private restaurantService: RestaurantService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.restaurantId = +this.route.snapshot.paramMap.get('id');
    // const request = {
    //   entity_id: this.searchLocation ?? 61,
    //   entity_type: 'city',
    //   query: this.searchTerm
    // } as unknown as RequestOption;
    this.restaurant$ = this.restaurantService.getRestaurantDetailsById(this.restaurantId);
    this.reviews$ = this.restaurantService.getReviews(this.restaurantId)
      .pipe(
        map(res => res.map(x => x.review)),
        tap(data => console.log('reviews', data))
      );
  }

  goBack() {
    this.location.back();
  }

  seePhotos(url: string) {
    if (url !== '' || url !== undefined) {
      window.open(url, '_blank');
    }
  }
}
