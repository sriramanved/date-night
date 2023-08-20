'use client';

import { createContext, useContext, useState } from 'react';

interface SearchParameters {
  sort_on: string;
  locationName: string;
  radius: number;
  eventDateRange: {
    from?: Date | undefined;
    to?: Date | undefined;
  };
}

interface EventsContextType {
  searchParameters: SearchParameters | null;
  setSearchParameters: (value: SearchParameters) => void;
  isFetching: boolean;
  setIsFetching: (value: boolean) => void;
}

const defaultValue: EventsContextType = {
  searchParameters: null,
  setSearchParameters: () => {},
  isFetching: false,
  setIsFetching: () => {},
};

export const EventsContext = createContext<EventsContextType>(defaultValue);

export function EventsProvider({ children }: { children: React.ReactNode }) {
  const [searchParameters, setSearchParameters] = useState<SearchParameters | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  return (
    <EventsContext.Provider value={{ searchParameters, setSearchParameters, isFetching, setIsFetching }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEventsContext() {
  return useContext(EventsContext);
}
