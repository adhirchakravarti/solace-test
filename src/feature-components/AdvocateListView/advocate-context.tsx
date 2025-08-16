import { useSearchParams, usePathname } from "next/navigation";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";

import { useDebouncedCallback } from "use-debounce";

import type { SelectAdvocates } from "@/db/schema";
import { typedFetch } from "@/utils/typedFetch";

export interface AdvocateContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  advocates: SelectAdvocates[];
  setAdvocates: React.Dispatch<React.SetStateAction<SelectAdvocates[]>>;
}

export const AdvocateContext = createContext<AdvocateContextType | null>(null);

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
  const searchParams = useSearchParams();
  const pathname = usePathname();
  console.log({ pathname });

  const getAdvocates = async (searchTerm: string) => {
    try {
      const url = `/advocates${searchTerm ? `?searchTerm=${searchTerm}` : ""}`;
      console.log("Fetching advocates with URL:", url);
      const data = await typedFetch<{ data: SelectAdvocates[] }>(url);
      if (data?.data && data.data.length) {
        setAdvocates(data.data);
      } else {
        setAdvocates([]);
      }
    } catch (error) {
      console.warn("Error when fetching advocate list on client side", error);
    }
  };

  const throttledCallback = useDebouncedCallback((searchTerm: string) => {
    console.log("Throttled search term:", searchTerm);
    getAdvocates(searchTerm);
  }, 800);

  const [searchTerm, setSearchTerm] = React.useState<string>(
    searchParams.get("searchTerm") || ""
  );
  const [advocates, setAdvocates] = React.useState<SelectAdvocates[]>([]);

  const handleUpdateSearchParams = useCallback(
    (trimmedSearchTerm: string) => {
      const params = new URLSearchParams(searchParams);
      console.log({ trimmedSearchTerm });
      if (trimmedSearchTerm) {
        params.set("searchTerm", trimmedSearchTerm);
      } else {
        params.delete("searchTerm");
      }
      console.log("Updated Search Params:", {
        params: params,
        paramsSize: params.size,
        paramsString: params.toString(),
      });
      window.history.pushState(
        null,
        "",
        `${pathname}${params.has("searchTerm") ? `?${params.toString()}` : ""}`
      );
    },
    [pathname, searchParams]
  );

  useEffect(() => {
    console.log("Advocates updated:", advocates);
  }, [advocates]);

  useEffect(() => {
    const trimmedSearchTerm = searchTerm.trim();
    handleUpdateSearchParams(trimmedSearchTerm);
    throttledCallback(trimmedSearchTerm);
  }, [searchTerm, pathname, throttledCallback, handleUpdateSearchParams]);

  return (
    <AdvocateContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        advocates,
        setAdvocates,
      }}
    >
      {children}
    </AdvocateContext.Provider>
  );
};
