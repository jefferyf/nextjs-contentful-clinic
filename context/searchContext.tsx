import React, { Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface ISearchState {
  positive?: boolean;
  fiveDays?: boolean;
  zipCode?: string;
}

interface IContextType {
  searchDetails: ISearchState,
  setSearchDetails: Dispatch<SetStateAction<ISearchState>>
}

// initial state
const defaultSearchState: ISearchState = {
  positive: undefined,
  fiveDays: undefined,
  zipCode: '',
};

export const SearchContext =
  React.createContext<IContextType | undefined>(undefined);

export const useSearch = () => useContext(SearchContext);

const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchDetails, setSearchDetails] =
    useState<ISearchState>(defaultSearchState);

  return (
    <SearchContext.Provider value={{ searchDetails, setSearchDetails }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
