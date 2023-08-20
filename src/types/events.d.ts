export type Location = {
  address1: string;
  address2: string;
  address3: string;
  city: string;
  zip_code: string;
  country: string;
  state: string;
  display_address: string[];
  cross_streets: string;
};

export type SearchEvent = {
  attending_count: number;
  category: string;
  cost: number | null;
  cost_max: number | null;
  description: string;
  event_site_url: string;
  id: string;
  image_url: string;
  interested_count: number;
  is_canceled: boolean;
  is_free: boolean;
  is_official: boolean;
  latitude: number;
  longitude: number;
  name: string;
  tickets_url: string | null;
  time_end: string | null;
  time_start: string;
  location: Location;
  business_id: string | null;
};

export type EventsResponse = {
  events: SearchEvent[];
  total: number;
};
