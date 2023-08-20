"use client";

import { usePlacesContext } from "@/(contexts)/places";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink } from "lucide-react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Separator } from "@/components/ui/Separator";
import { Business, Category } from "@/types/places";
import { Button } from "@/components/ui/Button";
import { filterAttributes } from "@/lib/helpers/constants/places";

export default function PlacesSearchResults() {
  const { searchParameters, setIsFetching } = usePlacesContext();

  const attributeMap: { [key: string]: string } = filterAttributes.reduce(
    (map: { [key: string]: string }, attribute) => {
      map[attribute.id] = attribute.label;
      return map;
    },
    {}
  );

  const {
    data: places,
    isError,
    isFetching,
    isFetched,
  } = useQuery({
    queryFn: async () => {
      if (!searchParameters) return [];

      const prices = searchParameters.pricing
        .map((price) => price.length)
        .join();

      const attributes = searchParameters.attributes?.join();

      const params: Record<string, unknown> = {
        term: searchParameters.keywords,
        location: searchParameters.locationName,
        price: prices,
        radius: searchParameters.radius,
        sort_by: searchParameters.sort_by,
        limit: 35,
        attributes: attributes,
      };

      if (searchParameters.open_now) {
        params.open_now = searchParameters.open_now;
      }

      const { data } = await axios.get("/api/yelp/places/autocompletion", {
        params: params, 
      });

      console.log(data);

      return data;
    },
    queryKey: ["yelp-places", searchParameters],
    refetchOnWindowFocus: false,
    enabled: !!searchParameters,
  });

  if (isFetching) {
    setIsFetching(true);
  }
  if (isFetched) {
    setIsFetching(false);
  }
  if (isError)
    return <p>There was an error processing your request. Please try again!</p>;

  return (
    <div className="my-10 text-sm">
      {searchParameters && (
        <p className="mb-3">
          Showing results for{" "}
          {searchParameters.keywords
            ? `"${searchParameters.keywords}"`
            : "places"}{" "}
          in {searchParameters.locationName}
          {searchParameters.open_now && " that are open now"}
        </p>
      )}
      <div className="mb-6">
        {searchParameters?.attributes?.map((attributeId) => (
          <Badge key={attributeId} className="mr-2 mb-2">
            {attributeMap[attributeId]}
          </Badge>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {places?.businesses?.map((business: Business) => (
          <Card
            key={business.id}
            className="flex flex-col justify-between w-full max-w-sm shadow-lg p-2 transform transition-transform duration-500 hover:scale-105"
          >
            <CardHeader>
              <CardTitle className="text-sm">{business.name}</CardTitle>
              <div className="flex items-center space-x-2">
                <Badge>{business.rating} ⭐</Badge>
                {business.price && <Badge>{business.price}</Badge>}
              </div>
            </CardHeader>
            <CardContent className="flex flex-col">
              <div className="w-full h-48 flex justify-center items-center mb-2">
                <img
                  src={business.image_url}
                  alt={business.name}
                  className="object-cover rounded-lg max-h-full"
                />
              </div>
              <CardDescription className="text-sm">
                {business.categories
                  .map((category: Category) => category.title)
                  .join(", ")}
              </CardDescription>
              <Separator className="my-2" />
              <div className="text-sm">
                <p>{business.location.display_address.join(", ")}</p>
                <p>{business.display_phone}</p>
              </div>
              <Separator className="my-2" />
              <div className="flex flex-wrap">
                {business.transactions &&
                  business.transactions.map((transaction: string, index) => (
                    <Badge key={index} className="mr-2 mb-2 text-sm">
                      {transaction === "restaurant_reservation"
                        ? "reservations"
                        : transaction.replace(/_/g, " ")}
                    </Badge>
                  ))}
              </div>
            </CardContent>
            <CardFooter className="p-1 text-sm pb-2">
              <Button variant="link">
                <a
                  href={business.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Yelp
                </a>
                <ExternalLink className="inline-block ml-1" size={16} />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
