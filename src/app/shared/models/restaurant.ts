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
  restaurants: FilteredRestaurant[];
}

// export interface Location {
//   entity_type: string;
//   entity_id: number;
//   title: string;
//   latitude: number;
//   longitude: number;
//   city_id: number;
//   city_name: string;
//   country_id: number;
//   country_name: string;
// }

export interface HasMenuStatus {
  delivery: number;
  takeaway: number;
}

export interface R {
  has_menu_status: HasMenuStatus;
  res_id: number;
  is_grocery_store: boolean;
}

export interface Location2 {
  address: string;
  locality: string;
  city: string;
  city_id: number;
  latitude: string;
  longitude: string;
  zipcode: string;
  country_id: number;
  locality_verbose: string;
}

export interface Title {
  text: string;
}

export interface BgColor {
  type: string;
  tint: string;
}

export interface RatingObj {
  title: Title;
  bg_color: BgColor;
}

export interface UserRating {
  // aggregate_rating: any;
  rating_text: string;
  rating_color: string;
  rating_obj: RatingObj;
  // votes: any;
}

export interface Review {
  review: any[];
}

export interface AllReviews {
  reviews: Review[];
}

export interface Restaurant {
  R: R;
  id: string;
  name: string;
  url: string;
  // location: Location2;
  switch_to_order_menu: number;
  cuisines: string;
  timings: string;
  // average_cost_for_two: number;
  // price_range: number;
  currency: string;
  highlights: string[];
  offers: any[];
  opentable_support: number;
  is_zomato_book_res: number;
  mezzo_provider: string;
  is_book_form_web_view: number;
  book_form_web_view_url: string;
  book_again_url: string;
  thumb: string;
  user_rating: UserRating;
  // all_reviews_count: number;
  photos_url: string;
  // photo_count: number;
  menu_url: string;
  featured_image: string;
  medio_provider: number;
  // has_online_delivery: number;
  // is_delivering_now: number;
  store_type: string;
  include_bogo_offers: boolean;
  deeplink: string;
  is_table_reservation_supported: number;
  // has_table_booking: number;
  book_url: string;
  events_url: string;
  phone_numbers: string;
  // all_reviews: AllReviews;
  establishment: string[];
}


export interface BestRatedRestaurant {
  restaurant: Restaurant;
}
export interface NearbyRestaurant {
  restaurant: Restaurant;
}
export interface FilteredRestaurant {
  restaurant: Restaurant;
}

export interface BestRatedRestaurantResult {
  popularity: string;
  nightlife_index: string;
  nearby_res: string[];
  top_cuisines: string[];
  popularity_res: string;
  nightlife_res: string;
  subzone: string;
  subzone_id: number;
  city: string;
  location: Location;
  num_restaurant: number;
  best_rated_restaurant: BestRatedRestaurant[];
}

export interface RequestOption {
  entity_id: number;
  entity_type: string;
  query: string;
}