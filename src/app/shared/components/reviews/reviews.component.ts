import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { UserReview, Review } from './../../models/review';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit, OnChanges {
  @Input() reviews: Review[];
  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges() {
    console.log('reviews', this.reviews);
  }
}
