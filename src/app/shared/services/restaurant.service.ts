import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { Restaurant, BestRatedRestaurantResult, RequestOption, FilteredRestaurant } from '../models/restaurant';
import { tap, map } from 'rxjs/operators';
import { LocationResult } from '../models/location';
import { LocationSuggestion } from './../models/location';
import { Category, CategoriesResult } from './../models/category';
import { BestRatedRestaurant, Result } from './../models/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    const url = `${environment.baseUrl}/categories`;

    return this.http.get<CategoriesResult>(url)
      .pipe(
        map(res => res.categories),
        tap(data => console.log('categories', data))
      );
  }

  searchRestuarant(request: RequestOption): Observable<FilteredRestaurant[]> {
    const url = `${environment.baseUrl}/search`;
    const options = new HttpParams({
      fromObject: {
        entity_id: request.entity_id.toString(),
        entity_type: request.entity_type,
        q: request.query
      }
    });

    return this.http.get<Result>(url, { params: options })
      .pipe(
        map(res => res.restaurants),
        tap(data => console.log('search restaurants', data))
      );
  }

  getTopRatedRestaurants(entityId: number, entityType: string): Observable<BestRatedRestaurant[]> {
    const options = new HttpParams({
      fromObject: {
        entity_id: entityId.toString(),
        entity_type: entityType
      }
    });
    const url = `${environment.baseUrl}/location_details`;

    return this.http.get<BestRatedRestaurantResult>(url, { params: options })
      .pipe(
        map(res => res.best_rated_restaurant),
        tap(data => console.log('location details', data))
      );
  }

  searchCitiesByName(locationName: string): Observable<LocationSuggestion[]> {
    const options = new HttpParams({
      fromObject: { q: locationName }
    });
    const url = `${environment.baseUrl}/cities`;

    return this.http.get<LocationResult>(url, { params: options })
      .pipe(
        map(res => res.location_suggestions),
        tap(data => console.log('search res', data))
      );
  }
}
