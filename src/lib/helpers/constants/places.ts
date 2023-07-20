export const pricingOptions = [
  {
    id: "$",
    label: "$",
  },
  {
    id: "$$",
    label: "$$",
  },
  {
    id: "$$$",
    label: "$$$",
  },
  {
    id: "$$$$",
    label: "$$$$",
  },
];

export const validSortOptions = new Set([
  "best_match",
  "rating",
  "review_count",
  "distance",
]);

export const filterAttributes = [
  { id: "hot_and_new", label: "Hot and New" },
  {
    id: "reservation",
    label: "Takes reservations",
  },
  {
    id: "gender_neutral_restrooms",
    label: "Gender Neutral restrooms",
  },
  { id: "open_to_all", label: "Open To All" },
  {
    id: "wheelchair_accessible",
    label: "Wheelchair Accessible",
  },
  {
    id: "liked_by_vegetarians",
    label: "Vegetarian friendly",
  },
  { id: "outdoor_seating", label: "Outdoor seating" },
  {
    id: "parking_garage",
    label: "Parking garage nearby",
  },
  { id: "parking_lot", label: "Parking lot" },
  {
    id: "parking_street",
    label: "Street parking",
  },
  { id: "parking_valet", label: "Parking valet" },
  { id: "parking_bike", label: "Bike parking" },
  {
    id: "restaurants_delivery",
    label: "Delivery",
  },
  { id: "restaurants_takeout", label: "Takeout" },
  { id: "wifi_free", label: "Free WiFi" },
];
