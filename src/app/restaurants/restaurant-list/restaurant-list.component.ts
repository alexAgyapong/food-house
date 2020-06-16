import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Restaurant } from 'src/app/shared/models/restaurant';
import { RequestOption } from './../../shared/models/restaurant';
import { tap, map } from 'rxjs/operators';
import { Establishment } from 'src/app/shared/models/establishment';
import { Cuisine } from 'src/app/shared/models/cuisine';
import { Category } from 'src/app/shared/models/category';

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
  maxSize = 3;
  rotate = false;
  totalItems: number;
  pageSize = 20;
  establishmentTypes$: Observable<any[]>;
  cuisines$: Observable<Cuisine[]>;
  categories$: Observable<Category[]>;

  constructor(private restaurantService: RestaurantService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.city = this.route.snapshot.queryParamMap.get('city') || 'London';
    this.cityId = +this.route.snapshot.queryParamMap.get('cityId') || 61;
    this.searchTerm = this.route.snapshot.queryParamMap.get('searchTerm');
    // this.getRestaurantList();

    this.categories$ = this.restaurantService.getCategories();
    this.establishmentTypes$ = this.restaurantService.getEstablishments(this.cityId);
    this.cuisines$ = this.restaurantService.getCuisines(this.cityId);
  }

  private getRestaurantList(start?: number) {
    const request = {
      entity_id: this.cityId ?? 61,
      entity_type: 'city',
      query: this.searchTerm,
      start
    } as unknown as RequestOption;
    this.restaurants$ = this.restaurantService.searchRestuarant(request)
      .pipe(
        tap(data => this.totalItems = +data.results_found),
        map(res => res.restaurants),
        map(res => res.map(x => x.restaurant)),
        tap(data => console.log('res', data, 'total items', this.totalItems))
      );
  }

  onPageChange(event) {
    if (event.page) {
      const start = this.setStartPage(event.page);
      this.getRestaurantList(start);
    }
  }

  setStartPage(page: number) {
    return (20 * (page - 1)) + (page - 1);
  }

}
