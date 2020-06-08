import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/restaurant';
import { tap, map } from 'rxjs/operators';
import { LocationResult } from '../models/location';
import { LocationSuggestion } from './../models/location';
import { Category, CategoriesResult } from './../models/category';

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
  searchRestuarant(): Observable<Restaurant[]> {
    const url = `${environment.baseUrl}/search`;

    return this.http.get<any>(url)
      .pipe(
        map(res => res),
        tap(data => console.log('search res', data))
      );
  }

  searchCitiesByName(locationName: string): Observable<LocationSuggestion[]> {
    const options = new HttpParams({
      fromObject: {
        q: locationName
      }
    });
    const url = `${environment.baseUrl}/cities`;

    return this.http.get<LocationResult>(url, { params: options })
      .pipe(
        map(res => res.location_suggestions),
        tap(data => console.log('search res', data))
      );
  }
}
