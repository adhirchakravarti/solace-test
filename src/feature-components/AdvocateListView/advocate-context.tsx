import React, { createContext, useContext, useEffect, useMemo } from "react";

import type { SelectAdvocates } from "@/db/schema";

export interface AdvocateContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  advocates: SelectAdvocates[];
  setAdvocates: React.Dispatch<React.SetStateAction<SelectAdvocates[]>>;
  filteredAdvocates: SelectAdvocates[];
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

  useEffect(() => {
    console.log("Advocates updated:", advocates);
  }, [advocates]);

  const filteredAdvocates = useMemo(() => {
    const trimmedSearchTerm = searchTerm.trim();
    return advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(trimmedSearchTerm) ||
        advocate.lastName.toLowerCase().includes(trimmedSearchTerm) ||
        advocate.city.toLowerCase().includes(trimmedSearchTerm) ||
        advocate.degree.toLowerCase().includes(trimmedSearchTerm) ||
        advocate.specialties.some((s) =>
          s.toLowerCase().includes(trimmedSearchTerm)
        ) ||
        advocate.yearsOfExperience.toString().includes(trimmedSearchTerm)
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
