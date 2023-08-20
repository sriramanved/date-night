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
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
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
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { toast } from "@/hooks/use-toast";
import { usePlacesContext } from "@/(contexts)/places";
import {
  pricingOptions,
  validSortOptions,
  filterAttributes,
  categories,
} from "@/lib/helpers/constants/places";
import { Loader2 } from "lucide-react";
import { Slider } from "@/components/ui/Slider";
import { useState, useCallback, useRef } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

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

const FormSchema = z.object({
  locationName: z.string().nonempty("Location is required."),
  pricing: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one pricing option.",
  }),
  category: z.string().optional(),
  keywords: z.string(),
  radius: z
    .number()
    .min(1, "Radius must be at least 1 mile.")
    .max(24.854848, "Radius must not exceed 24.854848 miles."),
  open_now: z.boolean().optional(),
  sort_by: z.string(),
  attributes: z.array(z.string()).optional(),
});

export function LocationForm() {
  const { setSearchParameters, isFetching: isFetchingLocation } =
    usePlacesContext();
  const [radiusValue, setRadiusValue] = useState(6.21371);
  const [input, setInput] = useState("");
  const commandRef = useRef<HTMLDivElement>(null);
  const [showSearchResults, setShowSearchResults] = useState(false);

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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      locationName: "",
      pricing: [],
      keywords: "",
      radius: 6.21371,
      sort_by: "best_match",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    data.radius = Math.round(data.radius * 1609);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            name="category"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Category</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? categories.find(
                              (category) => category.value === field.value
                            )?.label
                          : "Select category"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search category..."
                        className="custom-input outline-none border-none focus:border-none focus:outline-none h-9"
                      />
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup>
                        {categories.map((category) => (
                          <CommandItem
                            value={category.label}
                            key={category.value}
                            onSelect={() => {
                              form.setValue("category", category.value);
                            }}
                          >
                            {category.label}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                category.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Select the category for the search.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pricing"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Pricing Options</FormLabel>
                <FormControl>
                  <div>
                    {" "}
                    {pricingOptions.map((option) => (
                      <FormItem
                        key={option.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(option.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, option.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== option.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {option.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </div>
                </FormControl>
                <FormDescription>
                  Select the pricing options you are interested in.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="keywords"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Keywords</FormLabel>
                <FormControl>
                  <Input
                    className="w-full md:w-1/2"
                    placeholder="Enter keywords..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Include any optional terms to aid in your search.
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
            name="open_now"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value || false}
                    onCheckedChange={(checkedState) => {
                      if (checkedState === "indeterminate") return;
                      field.onChange(checkedState);
                    }}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Open Now</FormLabel>
                  <FormDescription>
                    Select this option to only return the businesses that are
                    open now.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sort_by"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sort By</FormLabel>
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
                    <SelectItem value="best_match">Best Match</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="review_count">Review Count</SelectItem>
                    <SelectItem value="distance">Distance</SelectItem>
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
          <FormField
            control={form.control}
            name="attributes"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Flairs</FormLabel>
                <FormControl>
                  <div>
                    {filterAttributes.map((attribute) => (
                      <FormItem
                        key={attribute.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(attribute.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.value
                                  ? field.onChange([
                                      ...field.value,
                                      attribute.id,
                                    ])
                                  : field.onChange([attribute.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== attribute.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {attribute.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </div>
                </FormControl>
                <FormDescription>
                  Select the attributes you are interested in.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
        <Button type="submit" disabled={isFetchingLocation}>
          {isFetchingLocation ? (
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

export default LocationForm;
