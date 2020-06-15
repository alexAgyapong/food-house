import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { Restaurant, BestRatedRestaurantResult, RequestOption, FilteredRestaurant, Review, NearbyRestaurant } from '../models/restaurant';
import { tap, map } from 'rxjs/operators';
import { LocationResult } from '../models/location';
import { LocationSuggestion } from './../models/location';
import { Category, CategoriesResult } from './../models/category';
import { BestRatedRestaurant, Result } from './../models/restaurant';
import { ReviewResult } from '../models/review';
import { UserReview } from './../models/review';

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

  getRestaurantDetailsById(id: number): Observable<Restaurant> {
    const options = new HttpParams({
      fromObject: {
        res_id: id.toString()
      }
    });
    const url = `${environment.baseUrl}/restaurant`;

    return this.http.get<any>(url, { params: options })
      .pipe(
        tap(data => console.log('restaurant details', data))
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

  getNearbyRestaurants(lat: string, lon: string): Observable<NearbyRestaurant[]> {
    const options = new HttpParams({ fromObject: { lat, lon } });
    const url = `${environment.baseUrl}/geocode`;

    return this.http.get<any>(url, { params: options })
      .pipe(
        map(res => res.nearby_restaurants),
        tap(data => localStorage.setItem('nearbyRestaurants', JSON.stringify(data)))
      );
  }

  searchCitiesByName(locationName: string): Observable<LocationSuggestion[]> {
    const options = new HttpParams({ fromObject: { q: locationName } });
    const url = `${environment.baseUrl}/cities`;

    return this.http.get<LocationResult>(url, { params: options })
      .pipe(
        map(res => res.location_suggestions),
        tap(data => console.log('search res', data))
      );
  }

  getReviews(id: number): Observable<UserReview[]> {
    const options = new HttpParams({ fromObject: { res_id: id.toString() } });
    const url = `${environment.baseUrl}/reviews`;

    return this.http.get<ReviewResult>(url, { params: options })
      .pipe(map(res => res.user_reviews));
  }
}
