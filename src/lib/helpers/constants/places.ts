import { CategoryKey } from "@/types/places";

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

export const categories = [
  { label: "Food and Drink", value: "food_and_drink" },
  { label: "Snacks", value: "snacks" },
  { label: "Activities", value: "activities" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Art + Education", value: "art_and_education" },
  { label: "Sports", value: "sports" },
  { label: "Adventure + Nature", value: "adventure_and_nature" },
  { label: "Nightlife", value: "nightlife" },
  { label: "Shops + Markets", value: "shops_and_markets" },
  { label: "Health + Wellness", value: "health_and_wellness" },
  { label: "Travel", value: "accommodations_and_travel" },
  { label: "Venues", value: "events_and_venues" },
  { label: "Pets + Animals", value: "pets_and_animals" },
  { label: "Transportation", value: "transportation" },
] as const;


export const categoryMapping: Record<CategoryKey, string[]> = {
  food_and_drink: [
    "afghani", "african", "arabian", "argentine", "armenian", "australian", "austrian", "bagels",
    "bakeries", "bangladeshi", "bbq", "belgian", "brazilian", "breakfast_brunch", "breweries",
    "brewpubs", "bubbletea", "buffets", "burgers", "cafes", "cajun", "cakeshop", "calabrian",
    "cambodian", "cantonese", "catering", "champagne_bars", "cheese", "cheesesteaks", "chicken_wings",
    "chickenshop", "chinese", "chocolatiers", "cideries", "coffee", "colombian", "comfortfood",
    "creperies", "cuban", "czech", "delis", "desserts", "diners", "empanadas", "eritrean",
    "ethiopian", "falafel", "fishnchips", "fondue", "food", "food_court", "foodstands", "foodtrucks",
    "french", "gastropubs", "gelato", "georgian", "german", "gluten_free", "greek", "guamanian",
    "hawaiin", "hotdog", "hotdogs", "hotpot", "hungarian", "iberian", "icecream", "indian",
    "indonesian", "irish", "italian", "izakaya", "japacurry", "japanese", "kebab", "korean",
    "kosher", "laotian", "latin", "macarons", "malaysian", "mediterranean", "mexican", "mideastern",
    "modern_european", "mongolian", "moroccan", "newamerican", "newmexican", "nicaraguan", "noodles",
    "pakistani", "panasian", "pancakes", "persian", "peruvian", "pizza", "poke", "polish", "polynesian",
    "popcorn", "portuguese", "poutineries", "pretzels", "puerto_rican", "ramen", "raw_food", "salad",
    "salvadoran", "sandwiches", "seafood", "seafoodmarkets", "senegalese", "shanghainese", "shavedice",
    "shavedsnow", "singaporean", "soup", "southafrican", "southern", "spanish", "sri_lankan", "steak",
    "streetvendors", "sushi", "szechuan", "tacos", "taiwanese", "tapas", "tapasmallplates", "teppanyaki",
    "tex-mex", "thai", "tuscan", "ukrainian", "uzbek", "vegan", "vegetarian", "venezuelan", "vietnamese",
    "waffles"
  ],
  snacks: ["acaibowls", "candy", "donuts", "pretzels"],
  activities: [
    "aquariums", "arcades", "atvrentals", "bikerentals", "biketours", "boatcharters", "boating",
    "boattours", "bocceball", "bowling", "bungeejumping", "casinos", "challengecourses", "climbing",
    "clubcrawl", "escapegames", "fishing", "flyboarding", "golf", "golflessons", "gokarts", "horseracing",
    "huntingfishingsupplies", "jetskis", "kiteboarding", "laser tag", "minigolf", "mountainbiking",
    "paragliding", "parasailing", "poolbilliards", "rafting", "rock_climbing", "sailing", "scavengerhunts",
    "snorkeling", "spelunking", "surfing", "surfschools", "swimmingpools", "trampoline", "zipline", "zorbing"
  ],
  entertainment: [
    "amateursportsteams", "barcrawl", "comedyshows", "comedy clubs", "dinnertheater", "driveintheater",
    "drive_thrubars", "festivals", "jazzandblues", "karaoke", "karaokerental", "movie theaters",
    "music venues", "nightlife", "operas", "silentdisco", "social_clubs", "sportsteams", "theaters",
    "themedcafes", "tours", "whalewatchingtours"
  ],
  art_and_education: [
    "antiques", "artclasses", "artinstallation", "artmuseums", "arts", "arttours", "bookstores",
    "culturalcenter", "galleries", "historicaltours", "museums", "photoclasses", "publicart",
    "visitorcenters", "walkingtours"
  ],
  sports: [
    "active", "aerialfitness", "aerialtours", "airsoft", "archery", "badminton", "baseballfields",
    "basketballcourts", "battingcages", "bubblesoccer", "cardio classes", "circuittraininggyms", "freediving",
    "gymnasiums", "martialarts", "pilates", "racetracks", "racingexperience", "soccer", "squash", "tennis",
    "yoga"
  ],
  adventure_and_nature: [
    "beaches", "campgrounds", "gardens", "hiking", "horsebackriding", "hotsprings", "lakes", "landmarks",
    "parks", "ranches"
  ],
  nightlife: [
    "bars", "beer_and_wine", "beerbars", "champagne_bars", "cocktailbars", "comedyclubs", "danceclubs",
    "divebars", "gaybars", "irish_pubs", "jazzandblues", "karaoke", "musicvenues", "pianobars",
    "pubs", "speakeasies", "sportsbars", "tikibars", "whiskeybars", "wine_bars"
  ],
  shops_and_markets: [
    "adult", "antiques", "artgalleries", "artsupplies", "auctionhouses", "baby_gear",
    "bargainhunters", "beauty", "bikes", "books", "boutique", "brewing", "bridal", "cannabis_clinics",
    "cannabisdispensaries", "comicbooks", "computers", "cosmetics", "discountstore", "drones",
    "electronics", "eyewear_opticians", "fashion", "fleamarkets", "flowers", "gaming",
    "gardening", "gearrental", "gifts", "glassblowing", "goldbuyers", "guns_and_ammo", "hardware",
    "headshops", "hennaartists", "hobby", "homeandgarden", "jewelry", "knifesharpening", "knittingsupplies",
    "leather", "lingerie", "luggages", "mattresses", "medicalsupplies", "menscloth", "mobilephonerepair",
    "motorcyclinggear", "musicalinstruments", "outdoorgear", "outlet_stores", "palestinian",
    "perfume", "personal_shoppers", "personalassistants", "pharmacy", "popupshops", "religiousitems",
    "scandinavian", "shoppingcenters", "shoppingpassages", "skate_shops", "skishops", "snowequipment",
    "spas", "spiritual_shop", "sportgoods", "tabletopgames", "tattoo", "tea", "thrift_stores",
    "tobaccoshops", "toys", "uniforms", "vapeshops", "vinyl_records", "vitaminssupplements", "watches",
    "wholesalers", "wigs", "womenscloth", "yelpevents"
  ],
  health_and_wellness: [
    "acupuncture", "ayurveda", "barreclasses", "bathhouses", "bootcamps", "bowling", "buddhist_temples",
    "cardio classes", "chiropractors", "colonics", "cryotherapy", "day spas", "eyelashservice", "gymnastics",
    "gyms", "halotherapy", "homeopathic", "hydrotherapy", "hypnosis", "laser_hair_removal", "laserlasikeyes",
    "massage", "massage_schools", "massage_therapy", "medicalspa", "meditationcenters", "naturopathic",
    "nutritionists", "permanentmakeup", "personaltrainers", "pilates", "reflexology", "reiki",
    "saunas", "spas", "tai chi", "tanning", "teethwhitening", "traditionalchinese", "trampolin",
    "yoga"
  ],
  accommodations_and_travel: [
    "bedbreakfast", "campsites", "carrental", "hostels", "hotels", "motorcycle_rental", "rvparks",
    "rvrental", "resorts", "skiresorts", "tours", "trainstations", "vacationrentals"
  ],
  events_and_venues: [
    "balloons", "bands", "boat charters", "bounce house rentals", "carnivalgames", "caterers",
    "celebrityimpersonators", "clowns", "comedians", "corporateentertainment", "costume rentals",
    "countrydancehalls", "danceclubs", "dancehalls", "djs", "eventphotography", "facepainting",
    "flowers", "games", "hennaartists", "horses", "jazzandblues", "karaoke", "marchingbands",
    "officiants", "partycharacters", "party bus rentals", "party supplies", "personal chefs",
    "photoboothrentals", "photographers", "pianobars", "planners", "pokernight", "poolhalls",
    "psychics", "referees", "securityservices", "singers", "tabletopgames", "team_building",
    "triviahosts", "valetservices", "venues", "videofilmproductions", "weddingchappels",
    "wedding planning", "wine tours"
  ],
  pets_and_animals: [
    "animalphysicaltherapy", "aquariums", "aquariumservices", "birdshops", "dog_parks",
    "dogwalkers", "horsebackriding", "horses", "petadoption", "petboarding", "petbreeders",
    "petgroomers", "pethospice", "pethotel", "petinsurance", "petphotography", "pets",
    "petservices", "pet_sitting", "petstore", "pettingzoos", "pettraining", "pettransport",
    "petwasteremoval", "veterinarians", "wildlifecontrol", "zoos"
  ],
  transportation: [
    "airlines", "airport_shuttles", "airports", "bikerentals", "bikesharing", "boatrental",
    "buses", "cablecars", "carrental", "ferries", "limos", "metro", "motorcycle_rental",
    "pedicabs", "privatejetcharter", "publictransport", "sharedtaxis", "taxis", "towncarservice",
    "trains", "valet_services"
  ]
};

