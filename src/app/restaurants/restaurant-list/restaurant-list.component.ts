import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Restaurant, FilteredRestaurant } from 'src/app/shared/models/restaurant';
import { RequestOption } from './../../shared/models/restaurant';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {
  searchLocation: string;
  searchTerm: string;
  restaurants$: Observable<Restaurant[]>;
  city: string;
  cityId: number;
  // restaurants$ = new Observable<FilteredRestaurant[]>();

  constructor(private restaurantService: RestaurantService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.city = this.route.snapshot.queryParamMap.get('city');
    this.cityId = +this.route.snapshot.queryParamMap.get('cityId');
    this.searchTerm = this.route.snapshot.queryParamMap.get('searchTerm');
    const request = {
      entity_id: this.cityId ?? 61,
      entity_type: 'city',
      query: this.searchTerm
    } as unknown as RequestOption;
    this.restaurants$ = this.restaurantService.searchRestuarant(request)
      .pipe(
        map(res => res.map(x => x.restaurant)),
        tap(data => console.log('res', data))
      );
  }

}
