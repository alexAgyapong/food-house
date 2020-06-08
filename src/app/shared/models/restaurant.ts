export interface Location {
  address: string;
  locality: string;
  city: string;
  latitude: string;
  longitude: string;
  zipcode: string;
  country_id: string;
}

export interface UserRating {
  aggregate_rating: string;
  rating_text: string;
  rating_color: string;
  votes: string;
}

export interface User {
  name: string;
  zomato_handle: string;
  foodie_level: string;
  foodie_level_num: string;
  foodie_color: string;
  profile_url: string;
  profile_deeplink: string;
  profile_image: string;
}

export interface Photo {
  id: string;
  url: string;
  thumb_url: string;
  user: User;
  res_id: string;
  caption: string;
  timestamp: string;
  friendly_time: string;
  width: string;
  height: string;
  comments_count: string;
  likes_count: string;
}

export interface AllReview {
  rating: string;
  review_text: string;
  id: string;
  rating_color: string;
  review_time_friendly: string;
  rating_text: string;
  timestamp: string;
  likes: string;
  user: User;
  comments_count: string;
}

export interface Restaurant {
  id: string;
  name: string;
  url: string;
  location: Location;
  average_cost_for_two: string;
  price_range: string;
  currency: string;
  thumb: string;
  featured_image: string;
  photos_url: string;
  menu_url: string;
  events_url: string;
  user_rating: UserRating;
  has_online_delivery: string;
  is_delivering_now: string;
  has_table_booking: string;
  deeplink: string;
  cuisines: string;
  all_reviews_count: string;
  photo_count: string;
  phone_numbers: string;
  photos: Photo[];
  all_reviews: AllReview[];
}

export interface Result {
  results_found: string;
  results_start: string;
  results_shown: string;
  restaurants: Restaurant[];
}
