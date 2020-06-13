import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NearbyRestaurant, Restaurant } from 'src/app/shared/models/restaurant';

@Component({
  selector: 'app-shared-restaurant-list',
  templateUrl: './shared-restaurant-list.component.html',
  styleUrls: ['./shared-restaurant-list.component.scss']
})
export class SharedRestaurantListComponent implements OnInit, OnChanges {
  @Input() nearbyRestaurants: Restaurant[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    console.log('nearby', this.nearbyRestaurants);
  }
}
