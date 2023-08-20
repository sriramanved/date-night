export type Category = {
  alias: string;
  title: string;
};

export type Location = {
  address1: string;
  address2: string | null;
  address3: string | null;
  city: string;
  zip_code: string;
  country: string;
  state: string;
  display_address: string[];
};

export type Business = {
  id: string;
  alias: string;
  name: string;
  image_url: string;
  is_closed: boolean;
  url: string;
  review_count: number;
  categories: Category[];
  rating: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  transactions: string[];
  price: string;
  location: Location;
  phone: string;
  display_phone: string;
  distance: number;
};

export type CategoryKey =
  | "food_and_drink"
  | "snacks"
  | "activities"
  | "entertainment"
  | "art_and_education"
  | "sports"
  | "adventure_and_nature"
  | "nightlife"
  | "shops_and_markets"
  | "health_and_wellness"
  | "accommodations_and_travel"
  | "events_and_venues"
  | "pets_and_animals"
  | "transportation";
