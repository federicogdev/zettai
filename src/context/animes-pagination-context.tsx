import React, { createContext, FC, ReactNode, useState } from "react";

interface IAnimesPaginationContextProviderProps {
  children: ReactNode;
}

type AnimesPaginationContextState = {
  topAnimesFilter: string | null;
  topAnimesPage: number;
  queryAnimesPage: number;
  setTopAnimesFilter: (filter: string) => void;
  setTopAnimesPage: (page: number) => void;
  setQueryAnimesPage: (page: number) => void;
};

const contextDefaultValue: AnimesPaginationContextState = {
  topAnimesFilter: "airing",
  topAnimesPage: 1,
  queryAnimesPage: 1,
  setTopAnimesFilter: () => {},
  setTopAnimesPage: () => {},
  setQueryAnimesPage: () => {},
};

export const AnimesPaginationContext =
  createContext<AnimesPaginationContextState>(contextDefaultValue);

export const AnimesPaginationContextProvider: FC<
  IAnimesPaginationContextProviderProps
> = ({ children }) => {
  const [topAnimesFilter, _setTopAnimesFilter] = useState(
    contextDefaultValue.topAnimesFilter
  );

  const [topAnimesPage, _setTopAnimesPage] = useState(
    contextDefaultValue.topAnimesPage
  );
  const [queryAnimesPage, _setQueryAnimesPage] = useState(
    contextDefaultValue.queryAnimesPage
  );

  const setTopAnimesFilter = (filter: string) => {
    _setTopAnimesFilter(filter);
  };

  const setTopAnimesPage = (page: number) => {
    _setTopAnimesPage(page);
  };

  const setQueryAnimesPage = (page: number) => {
    _setQueryAnimesPage(page);
  };
  return (
    <AnimesPaginationContext.Provider
      value={{
        topAnimesFilter,
        topAnimesPage,
        queryAnimesPage,
        setTopAnimesFilter,
        setTopAnimesPage,
        setQueryAnimesPage,
      }}
    >
      {children}
    </AnimesPaginationContext.Provider>
  );
};
