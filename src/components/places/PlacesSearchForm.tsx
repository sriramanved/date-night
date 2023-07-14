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
import { Checkbox } from "@/components/ui/Checkbox";
import AutocompleteLocation from "./AutocompleteLocation";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { usePlacesContext } from "@/(contexts)/places";
import { pricingOptions } from "@/lib/helpers/constants/pricingOptions";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const FormSchema = z.object({
  locationName: z.string({
    required_error: "Please select a location.",
  }),
  pricing: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one pricing option.",
  }),
  keywords: z.string(),
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
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    form.reset();
    setClearInput(Date.now());
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
        </>

        <Button type="submit" disabled={isFetching}>
          {isFetching ? (
            <>
              Searching... <Loader2 className="mx-2 h-4 w-4 animate-spin"/>
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
