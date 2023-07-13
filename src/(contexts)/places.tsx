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
}

const defaultValue: PlacesContextType = {
  searchParameters: null,
  setSearchParameters: () => {},
};

export const PlacesContext = createContext<PlacesContextType>(defaultValue);

export function PlacesProvider({ children }: { children: React.ReactNode }) {
  const [searchParameters, setSearchParameters] = useState<SearchParameters | null>(null);

  return (
    <PlacesContext.Provider value={{ searchParameters, setSearchParameters }}>
      {children}
    </PlacesContext.Provider>
  );
}

export function usePlacesContext() {
  return useContext(PlacesContext);
}
