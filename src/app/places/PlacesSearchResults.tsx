"use client";

import { usePlacesContext } from "@/(contexts)/places";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function PlacesSearchResults() {
  const { searchParameters } = usePlacesContext();

  const {
    data: places,
    isError,
    isFetching,
  } = useQuery({
    queryFn: async () => {
      if (!searchParameters) return [];

      const prices = searchParameters!.pricing.map((price) => price.length).join();

      const { data } = await axios.get("/api/yelp", {
        params: {
          term: searchParameters!.keywords,
          location: searchParameters!.locationName,
          price: prices,
          sort_by: "best_match",
          limit: 20,
        },
      });

      return data;
    },
    queryKey: ["yelp-places", searchParameters],
    refetchOnWindowFocus: false,
    enabled: !!searchParameters,
  });

  if (isFetching) return <p>Loading places data...</p>;
  if (isError)
    return <p>There was an error processing your request. Please try again!</p>;

  // render your results
  return <div>{places && <div>{JSON.stringify(places)}</div>}</div>;
}