import React, { createContext, useContext, useEffect, useMemo } from "react";

import type { SelectAdvocates } from "@/db/schema";

export interface AdvocateContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  advocates: SelectAdvocates[];
  setAdvocates: React.Dispatch<React.SetStateAction<SelectAdvocates[]>>;
  filteredAdvocates: SelectAdvocates[];
//   setFilteredAdvocates: React.Dispatch<React.SetStateAction<SelectAdvocates[]>>;
}

export const AdvocateContext = createContext<AdvocateContextType | null>(
  null
);

export const useAdvocateContext = (): AdvocateContextType => {
  const context = useContext(AdvocateContext);
  if (!context) {
    throw new Error(
      "useAdvocateContext must be used within an AdvocateProvider"
    );
  }
  return context;
};
export const AdvocateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [advocates, setAdvocates] = React.useState<SelectAdvocates[]>([]);
//   const [filteredAdvocates, setFilteredAdvocates] = React.useState<
//     SelectAdvocates[]
//   >([]);

  useEffect(() => {
    console.log("Advocates updated:", advocates);
  }, [advocates]);

  const filteredAdvocates = useMemo(() => {
    return advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(searchTerm) ||
        advocate.lastName.toLowerCase().includes(searchTerm) ||
        advocate.city.toLowerCase().includes(searchTerm) ||
        advocate.degree.toLowerCase().includes(searchTerm) ||
        advocate.specialties.some((s) =>
          s.toLowerCase().includes(searchTerm)
        ) ||
        advocate.yearsOfExperience.toString().includes(searchTerm)
      );
    });
  }, [advocates, searchTerm]);

  return (
    <AdvocateContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        advocates,
        setAdvocates,
        filteredAdvocates,
      }}
    >
      {children}
    </AdvocateContext.Provider>
  );
};
