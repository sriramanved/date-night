"use client";

import { useEventsContext } from "@/(contexts)/events";
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
import { SearchEvent } from "@/types/events";
import { Button } from "@/components/ui/Button";

export default function EventsSearchResults() {
  const { searchParameters, setIsFetching } = useEventsContext();

  const {
    data: events,
    isError,
    isFetching,
    isFetched,
  } = useQuery({
    queryFn: async () => {
      if (!searchParameters) return [];

      const params: Record<string, unknown> = {
        location: searchParameters.locationName,
        radius: searchParameters.radius,
        sort_on: searchParameters.sort_on,
        is_free: false,
        start_date: searchParameters.eventDateRange.from
          ? Math.floor(searchParameters.eventDateRange.from.getTime() / 1000)
          : undefined,
        end_date: searchParameters.eventDateRange.to
          ? Math.floor(searchParameters.eventDateRange.to.getTime() / 1000)
          : undefined,
        limit: 35,
      };

      const { data } = await axios.get("/api/yelp/events/autocompletion", {
        params: params,
      });

      console.log(data);

      return data;
    },
    queryKey: ["yelp-events", searchParameters],
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
      {/* {searchParameters && (
        <p className="mb-3">
          Showing results for{" "}
          {searchParameters.keywords
            ? `"${searchParameters.keywords}"`
            : "events"}{" "}
          in {searchParameters.locationName}
        </p>
      )} */}
      {/* You can include badges here based on your requirements */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {events?.events?.map((event: SearchEvent) => (
          <Card
            key={event.id}
            className="flex flex-col justify-between w-full max-w-sm shadow-lg p-2 transform transition-transform duration-500 hover:scale-105"
          >
            <CardHeader>
              <CardTitle className="text-sm">{event.name}</CardTitle>
              {/* Include any other details you want to show in the card header */}
            </CardHeader>
            <CardContent className="flex flex-col">
              {/* Include details about the event here */}
            </CardContent>
            <CardFooter className="p-1 text-sm pb-2">
              <Button variant="link">
                <a
                  href={
                    event.tickets_url
                      ? event.tickets_url
                      : "https://www.yelp.com/"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
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
