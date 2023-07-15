"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
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
import { Checkbox } from "@/components/ui/Checkbox";
import AutocompleteLocation from "./AutocompleteLocation";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { usePlacesContext } from "@/(contexts)/places";
import { pricingOptions } from "@/lib/helpers/constants/pricingOptions";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Slider } from "@/components/ui/Slider";

const validSortOptions = new Set([
  "best_match",
  "rating",
  "review_count",
  "distance",
]);

// Array of attributes
const filterAttributes = [
  { id: "hot_and_new", label: "Hot and New" },
  { id: "reservation", label: "Reservation" },
  //...add all the attributes here
];

const FormSchema = z.object({
  locationName: z.string({
    required_error: "Please select a location.",
  }),
  pricing: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one pricing option.",
  }),
  keywords: z.string(),
  radius: z
    .number()
    .min(1, "Radius must be at least 1 meter.")
    .max(40000, "Radius must not exceed 40,000 meters."),
  open_now: z.boolean().optional(),
  sort_by: z.string(),
  attributes: z.array(z.string()).optional(),
});

export function LocationForm() {
  const { setSearchParameters, isFetching } = usePlacesContext();
  const [clearInput, setClearInput] = useState(0);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      locationName: "",
      pricing: [],
      keywords: "",
      radius: 10000,
      sort_by: "best_match",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // setClearInput(Date.now());
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
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <AutocompleteLocation
                    key={clearInput}
                    onLocationSelect={(location) => {
                      form.setValue(
                        "locationName",
                        `${location.name}, ${location.adminDivision1.name}, USA`
                      );
                    }}
                    onClear={clearInput}
                  />
                </FormControl>
                <FormDescription>
                  This is the location that will be used for the center of your
                  search.
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
                <FormLabel>Search Radius (in meters)</FormLabel>
                <FormControl>
                  <Slider
                    defaultValue={[field.value]}
                    max={40000}
                    step={1000} // Adjust the step as per your requirement
                    onValueChange={(values) => field.onChange(values[0])}
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
                    <SelectTrigger>
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
                  Suggest to Yelp's search algorithm that the results be sorted
                  by the selected option.
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
                <FormLabel>Attributes</FormLabel>
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

        <Button type="submit" disabled={isFetching}>
          {isFetching ? (
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
