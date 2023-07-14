import PlacesSearchForm from "./PlacesSearchForm";
import PlacesSearchResults from "./PlacesSearchResults";
import { PlacesProvider } from "@/(contexts)/places";

const Page = () => {
  // render meta tags about the page
  return (
    <PlacesProvider>
      <PlacesSearchForm />
      <PlacesSearchResults />
    </PlacesProvider>
  );
};

export default Page;
