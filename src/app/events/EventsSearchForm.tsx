"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
  CommandGroup,
} from "@/components/ui/Command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/Calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Slider } from "@/components/ui/Slider";
import { useState, useCallback, useRef } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { useEventsContext } from "@/(contexts)/events";
import { validSortOptions } from "@/lib/helpers/constants/events";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

interface Location {
  id: string;
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  adminDivision1: {
    name: string;
  };
}

const EventFormSchema = z.object({
  sort_on: z.string(),
  locationName: z.string().nonempty("Location is required."),
  eventDateRange: z.object({
    from: z.date().optional(),
    to: z.date().optional(),
  }),
  radius: z
    .number()
    .min(1, "Radius must be at least 1 mile.")
    .max(24.854848, "Radius must not exceed 24.854848 miles."),
});

export function EventsSearchForm() {
  const { setSearchParameters, isFetching: isFetchingEvents } =
    useEventsContext();
  const [input, setInput] = useState("");
  const commandRef = useRef<HTMLDivElement>(null);
  const [radiusValue, setRadiusValue] = useState(6.21371);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });

  const request = debounce(async () => {
    refetch();
  }, 300);

  const debounceRequest = useCallback(() => {
    request();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useOnClickOutside(commandRef, () => {
    form.setValue("locationName", input);
    setShowSearchResults(false);
  });

  const {
    isFetching,
    data: locations,
    refetch,
    isFetched,
  } = useQuery({
    queryFn: async () => {
      if (!input) return [];
      const options = {
        method: "GET",
        url: "https://spott.p.rapidapi.com/places/autocomplete",
        params: {
          skip: "0",
          country: "US",
          q: input,
          language: " en",
          type: "CITY",
          limit: "80",
        },
        headers: {
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
          "X-RapidAPI-Host": "spott.p.rapidapi.com",
        },
      };
      const { data } = await axios.request(options);
      return data;
    },
    queryKey: ["location-query"],
    enabled: false,
  });

  const form = useForm<z.infer<typeof EventFormSchema>>({
    resolver: zodResolver(EventFormSchema),

    defaultValues: {
      locationName: "",
      sort_on: "popularity",
      radius: 6.21371,
    },
  });

  function onSubmit(data: z.infer<typeof EventFormSchema>) {
    data.radius = Math.round(data.radius * 1609);
    console.log("Form submitted with data:", data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    setSearchParameters(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) => console.log(errors))}
        className="space-y-6"
      >
        <>
          <FormField
            control={form.control}
            name="locationName"
            render={({ field, fieldState }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Command
                    ref={commandRef}
                    className="relative rounded-lg border max-w-lg overflow-visible"
                  >
                    <CommandInput
                      onValueChange={(text) => {
                        setInput(text);
                        debounceRequest();
                        form.setValue("locationName", text);
                        setInput(text);
                        setShowSearchResults(true);
                      }}
                      value={field.value}
                      className="custom-input outline-none border-none focus:border-none focus:outline-none ring-0"
                      placeholder="Search locations..."
                    />

                    {field.value.length > 0 && (
                      <CommandList className="bg-white shadow rounded-b-md">
                        {isFetched && locations?.length === 0 && (
                          <CommandEmpty>No results found.</CommandEmpty>
                        )}

                        {locations && locations.length > 0 && (
                          <CommandGroup heading="Locations">
                            {showSearchResults &&
                              locations.map((location: Location) => (
                                <CommandItem
                                  key={location.id}
                                  value={`${location.name}-${location.adminDivision1.name}`}
                                  onSelect={() => {
                                    const locationString = `${location.name}, ${location.adminDivision1.name}, USA`;
                                    form.setValue(
                                      "locationName",
                                      locationString
                                    );
                                    setInput(locationString);
                                  }}
                                >
                                  <div>
                                    <span>
                                      {location.name},{" "}
                                      {location.adminDivision1.name}, USA
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
                </FormControl>
                <FormDescription>
                  This is the location that will be used for the center of your
                  search.
                </FormDescription>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="eventDateRange"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Event Date Range</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-[300px] justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                        {field.value?.from ? (
                          field.value.to ? (
                            <>
                              {format(field.value.from, "LLL dd, y")} -{" "}
                              {format(field.value.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(field.value.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={field.value?.from}
                      selected={range}
                      onSelect={(selectedRange) => {
                        if (
                          selectedRange &&
                          selectedRange.from &&
                          selectedRange.to
                        ) {
                          setRange(selectedRange);
                          field.onChange(selectedRange);
                        } else if (selectedRange && selectedRange.from) {
                          setRange({
                            from: selectedRange.from,
                            to: selectedRange.from,
                          });
                          field.onChange({
                            from: selectedRange.from,
                            to: selectedRange.from,
                          });
                        }
                      }}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Select the range of dates for the events you are interested
                  in.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="radius"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  Search Radius: {radiusValue.toFixed(2)} miles
                </FormLabel>
                <FormControl>
                  <Slider
                    className="w-full md:w-1/2"
                    defaultValue={[radiusValue]}
                    max={24.854848}
                    min={1}
                    step={0.01}
                    onValueChange={(values) => {
                      field.onChange(values[0]);
                      setRadiusValue(values[0]);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  This is the search radius used for your search. It might be
                  adjusted by Yelp based on business density.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sort_on"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sort On</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    if (!validSortOptions.has(value)) {
                      throw new Error(`Invalid sort option: ${value}`);
                    }
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a sorting option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="time_start">Start Date</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Suggest to our search algorithm that the results be sorted by
                  the selected option.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
        <Button type="submit" disabled={isFetchingEvents}>
          {isFetchingEvents ? (
            <>
              Searching... <Loader2 className="mx-2 h-4 w-4 animate-spin" />
            </>
          ) : (
            "Search for date ideas!"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default EventsSearchForm;
