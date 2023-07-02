"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import { usePathname } from "next/navigation";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
  CommandGroup,
} from "@/components/ui/Command";

interface Location {
  id: string;
  geonameId: number;
  type: string;
  name: string;
  population: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  adminDivision1: {
    name: string;
  };
}

const AutocompleteLocation = () => {
  const [input, setInput] = useState("");
  const pathname = usePathname();

  const request = debounce(async () => {
    refetch();
  }, 300);

  const debounceRequest = useCallback(() => {
    request();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    isFetching,
    data: locations,
    refetch,
    isFetched,
  } = useQuery({
    queryFn: async () => {
      if (!input) return {};
      const options = {
        method: "GET",
        url: "https://spott.p.rapidapi.com/places/autocomplete",
        params: {
          skip: "0",
          country: "US",
          q: input,
          type: "CITY",
        },
        headers: {
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
          "X-RapidAPI-Host": "spott.p.rapidapi.com",
        },
      };
      const { data } = await axios.request(options);
      console.log(data);
      return data;
    },
    queryKey: ["location-query"],
    enabled: false,
  });

  useEffect(() => {
    setInput("");
  }, [pathname]);

  return (
    <Command className="relative rounded-lg border max-w-lg overflow-visible">
      <CommandInput
        onValueChange={(text) => {
          setInput(text);
          debounceRequest();
        }}
        value={input}
        className="custom-input outline-none border-none focus:border-none focus:outline-none ring-0"
        placeholder="Search locations..."
      />

      {input.length > 0 && (
        <CommandList className="absolute bg-white top-full inset-x-0 shadow rounded-b-md">
          {isFetched && locations?.length === 0 && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}

          {locations && locations.length > 0 && (
            <CommandGroup heading="Locations">
              {locations.map((location: Location) => (
                <CommandItem key={location.id} value={location.name}>
                  <div>
                    <span>
                      {location.name}, {location.adminDivision1.name}, USA
                    </span>
                    <br />
                    <small>
                      Lat: {location.coordinates.latitude}, Lng:{" "}
                      {location.coordinates.longitude}
                    </small>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      )}
    </Command>
  );
};

export default AutocompleteLocation;
