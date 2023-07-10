"use client";

// We must build a client side form that allows users to input their search parameters (location, date, etc) using the shadcn-ui form component

// ON THIS PAGE, we should render that client side form. We should also render the results of the search query.

import AutocompleteLocation from "./AutocompleteLocation"
import PlacesSearchForm from "./PlacesSearchForm"

const Page = ({}) => {
  console.log(process.env.RAPID_API_KEY);
  return (
    <>
      <PlacesSearchForm />
    </>
  )

}

export default Page;