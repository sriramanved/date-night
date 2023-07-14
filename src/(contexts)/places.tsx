'use client';

import { createContext, useContext, useState } from 'react';

interface SearchParameters {
    locationName: String;
    pricing: String[];
    keywords: String;
  }  

interface PlacesContextType {
  searchParameters: SearchParameters | null;
  setSearchParameters: (value: SearchParameters) => void;
  isFetching: boolean;
  setIsFetching: (value: boolean) => void;
}

const defaultValue: PlacesContextType = {
  searchParameters: null,
  setSearchParameters: () => {},
  isFetching: false,
  setIsFetching: () => {},
};

export const PlacesContext = createContext<PlacesContextType>(defaultValue);

export function PlacesProvider({ children }: { children: React.ReactNode }) {
  const [searchParameters, setSearchParameters] = useState<SearchParameters | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  return (
    <PlacesContext.Provider value={{ searchParameters, setSearchParameters, isFetching, setIsFetching }}>
      {children}
    </PlacesContext.Provider>
  );
}

export function usePlacesContext() {
  return useContext(PlacesContext);
}
