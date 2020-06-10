import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RestaurantService } from './../shared/services/restaurant.service';
import { debounceTime, tap, distinctUntilChanged, switchMap, catchError, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { LocationSuggestion } from '../shared/models/location';
import { Category, CategoryEnum } from './../shared/models/category';
import StringUtility from './../shared/string-utility';
import { BestRatedRestaurant, Restaurant } from '../shared/models/restaurant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchForm: FormGroup;
  locationSuggestions: LocationSuggestion[];
  locationSuggestions$: any;
  formatter: (x: { name: string; }) => string;
  cityId: number;
  suggestions: (searchTerm$: Observable<string>) => Observable<LocationSuggestion[]>;
  selectedCategories: Category[];
  topRatedRestaurants$ = new Observable<Restaurant[]>();

  constructor(private fb: FormBuilder, private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      restaurant: [''],
      location: ['']
    });

    this.getTopRatedRestaurants();
    // this.searchForm.valueChanges.pipe(debounceTime(1)).subscribe(data => {
    //   if (data && data.location) {
    //     this.getCitiesAutocomplete(data.location);
    //   }
    // });
    // this.getCategories();
    this.suggestions = (searchTerm$: Observable<string>) => searchTerm$
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        switchMap(term => this.restaurantService.searchCitiesByName(term)),
        tap(data => console.log('res from suggetions', data))
      );

    this.formatter = (x: { name: string }) => x.name;
  }

  getTopRatedRestaurants() {
    this.topRatedRestaurants$ = this.restaurantService.getTopRatedRestaurants(61, 'group')
      .pipe(map(res => res.map(x => x.restaurant)));
  }

  getCitiesAutocomplete(locationName: string) {
    this.restaurantService.searchCitiesByName(locationName).subscribe(res => {
      this.locationSuggestions$ = of(res);
      console.log('cities', res);
    });
  }

  getCategories() {
    const categoryArray = [CategoryEnum.Breakfast, CategoryEnum.Lunch,
    CategoryEnum.Dinner, CategoryEnum.Delivery, CategoryEnum.Takeaway];
    this.restaurantService.getCategories().subscribe((res: Category[]) => {
      console.log('cate in home comp', res);
      if (res && res.length) {
        this.selectedCategories = res.filter(({ categories }) => categoryArray.includes(categories.id));
      }
    });
  }

  search() {
    console.log('search');
  }

  onLocationSelected(selected: any) {
    if (selected && selected.item) {
      this.cityId = selected.item.id;
      console.log('selected', selected.item.id);
    }
  }
}
