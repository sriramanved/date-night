import PlacesSearchForm from "../../components/places/PlacesSearchForm";
import PlacesSearchResults from "../../components/places/PlacesSearchResults";
import { PlacesProvider } from "@/(contexts)/places";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Places',
  description: 'Search for places to go on a date.',
}

const Page = () => {

  return (
    <PlacesProvider>
      <PlacesSearchForm />
      <PlacesSearchResults />
    </PlacesProvider>
  );
};

export default Page;
