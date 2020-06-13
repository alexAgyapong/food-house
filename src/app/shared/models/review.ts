export interface User {
  name: string;
  zomato_handle: string;
  foodie_level: string;
  foodie_level_num: number;
  foodie_color: string;
  profile_url: string;
  profile_image: string;
  profile_deeplink: string;
}

export interface Review {
  rating: number;
  review_text: string;
  id: number;
  rating_color: string;
  review_time_friendly: string;
  rating_text: string;
  timestamp: number;
  likes: number;
  user: User;
  comments_count: number;
}

export interface UserReview {
  review: Review;
}

export interface ReviewResult {
  reviews_count: number;
  reviews_start: number;
  reviews_shown: number;
  user_reviews: UserReview[];
}
