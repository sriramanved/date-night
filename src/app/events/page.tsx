import EventsSearchForm from "./EventsSearchForm";
import EventsSearchResults from "./EventsSearchResults";
import { EventsProvider } from "@/(contexts)/events";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events',
  description: 'Search for events to go on a date.',
}

const EventsSearchPage = () => {

  return (
    <EventsProvider>
      <EventsSearchForm />
      <EventsSearchResults />
    </EventsProvider>
  );
};

export default EventsSearchPage;