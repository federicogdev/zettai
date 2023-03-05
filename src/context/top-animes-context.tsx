import React, { createContext, FC, ReactNode, useState } from "react";

interface ITopAnimesContextProviderProps {
  children: ReactNode;
}

type TopAnimesContextState = {
  topAnimesFilter: string | null;
  topAnimesPage: number;
  setTopAnimesFilter: (filter: string) => void;
  setTopAnimesPage: (page: number) => void;
};

const contextDefaultValue: TopAnimesContextState = {
  topAnimesFilter: "airing",
  topAnimesPage: 1,
  setTopAnimesFilter: () => {},
  setTopAnimesPage: () => {},
};

export const TopAnimesContext =
  createContext<TopAnimesContextState>(contextDefaultValue);

export const TopAnimesContextProvider: FC<ITopAnimesContextProviderProps> = ({
  children,
}) => {
  const [topAnimesFilter, _setTopAnimesFilter] = useState(
    contextDefaultValue.topAnimesFilter
  );

  const [topAnimesPage, _setTopAnimesPage] = useState(
    contextDefaultValue.topAnimesPage
  );

  const setTopAnimesFilter = (filter: string) => {
    _setTopAnimesFilter(filter);
  };

  const setTopAnimesPage = (page: number) => {
    _setTopAnimesPage(page);
  };
  return (
    <TopAnimesContext.Provider
      value={{
        topAnimesFilter,
        topAnimesPage,
        setTopAnimesFilter,
        setTopAnimesPage,
      }}
    >
      {children}
    </TopAnimesContext.Provider>
  );
};
