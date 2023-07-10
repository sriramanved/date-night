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
import AutocompleteLocation from "./AutocompleteLocation";
import { toast } from '@/hooks/use-toast'
import { Button } from "@/components/ui/Button";

// We could assume that each location has an unique id
const FormSchema = z.object({
    locationName: z.string({
      required_error: "Please select a location.",
    }),
  });

export function LocationForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="locationName"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Location</FormLabel>
              <FormControl>
                <AutocompleteLocation
                  onLocationSelect={(location) => {
                    form.setValue("locationName", `${location.name}, ${location.adminDivision1.name}, USA`);
                  }}
                />
              </FormControl>
              <FormDescription>
                This is the location that will be used for the center of your search.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default LocationForm;