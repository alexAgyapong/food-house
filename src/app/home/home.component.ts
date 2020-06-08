import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RestaurantService } from './../shared/services/restaurant.service';
import { debounceTime, tap, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { LocationSuggestion } from '../shared/models/location';

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

  constructor(private fb: FormBuilder, private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      restaurant: [''],
      location: ['']
    });

    // this.restaurantService.searchRestuarant().subscribe(res => console.log('in home', res));
    // this.searchForm.valueChanges.pipe(debounceTime(1)).subscribe(data => {
    //   if (data && data.location) {
    //     this.getCitiesAutocomplete(data.location);
    //   }
    // });
    this.suggestions = (searchTerm$: Observable<string>) => searchTerm$
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        switchMap(term => this.restaurantService.searchCitiesByName(term)),
        tap(data => console.log('res from suggetions', data))
      );

    this.formatter = (x: { name: string }) => x.name;
  }

  private getCitiesAutocomplete(locationName: string) {
    this.restaurantService.searchCitiesByName(locationName).subscribe(res => {
      this.locationSuggestions$ = of(res);
      console.log('cities', res);
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
