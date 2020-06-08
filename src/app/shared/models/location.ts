export interface LocationSuggestion {
  id: number;
  name: string;
  country_id: number;
  country_name: string;
  country_flag_url: string;
  should_experiment_with: number;
  has_go_out_tab: number;
  discovery_enabled: number;
  has_new_ad_format: number;
  is_state: number;
  state_id: number;
  state_name: string;
  state_code: string;
}

export interface LocationResult {
  location_suggestions: LocationSuggestion[];
  status: string;
  has_more: number;
  has_total: number;
  user_has_addresses: boolean;
}

export interface LocationRequestOption{
  q: string;
}