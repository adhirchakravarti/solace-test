import { useSearchParams, usePathname } from "next/navigation";

import React, {
  createContext,
  type FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { useDebouncedCallback } from "use-debounce";

import type { SelectAdvocates } from "@/db/schema";
import { typedFetch } from "@/utils/typedFetch";
import {
  SearchParamKeys,
  SortDirections,
} from "@/features/AdvocateListView/constants";
import type {
  HandleUpdateSearchParamsInput,
  AdvocatesSortDescriptor,
  SortDirection,
} from "@/features/AdvocateListView/types";

export interface AdvocateContextType {
  advocates: SelectAdvocates[];
  isLoading?: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortDescriptor: AdvocatesSortDescriptor;
  setSortDescriptor: React.Dispatch<
    React.SetStateAction<AdvocatesSortDescriptor>
  >;
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

export const AdvocateProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get("searchTerm") || ""
  );
  const [sortDescriptor, setSortDescriptor] = useState<AdvocatesSortDescriptor>(
    {
      column: searchParams.get(SearchParamKeys.sortBy) ?? "firstName",
      direction:
        (searchParams.get(SearchParamKeys.sortDirection) as SortDirection) ??
        SortDirections.ascending,
    }
  );
  const [advocates, setAdvocates] = useState<SelectAdvocates[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const getAdvocates = useCallback(async () => {
    try {
      const formattedParams = searchParams.size
        ? searchParams.entries().reduce((acc, [key, value], index) => {
            const isFirstItem = index === 0;
            if (value) {
              acc += `${isFirstItem ? "?" : "&"}${key}=${encodeURIComponent(
                value
              )}`;
            }
            return acc;
          }, "")
        : "";
      const url = `/advocates${
        formattedParams.length ? `${formattedParams}` : ""
      }`;
      const data = await typedFetch<{ data: SelectAdvocates[] }>(url);
      if (data?.data && data.data.length) {
        setAdvocates(data.data);
      } else {
        setAdvocates([]);
      }
    } catch (error) {
      console.warn("Error when fetching advocate list on client side", error);
    }
  }, [searchParams]);

  const throttledCallback = useDebouncedCallback(async () => {
    setIsFetching(true);
    await getAdvocates();
    setIsFetching(false);
  }, 800);

  const handleUpdateSearchParams = useCallback(
    (input: HandleUpdateSearchParamsInput) => {
      const params = new URLSearchParams(searchParams);
      for (const [paramKey, paramValue] of Object.entries(input)) {
        if (paramValue) {
          params.set(paramKey, paramValue);
        } else {
          params.delete(paramKey);
        }
      }

      window.history.pushState(
        null,
        "",
        `${pathname}${
          Object.values(input).length ? `?${params.toString()}` : ""
        }`
      );
      throttledCallback();
    },
    [pathname, searchParams, throttledCallback]
  );

  useEffect(() => {
    const trimmedSearchTerm = searchTerm.trim();
    const params = {
      [SearchParamKeys.searchTerm]: trimmedSearchTerm,
    };
    handleUpdateSearchParams(params);
  }, [searchTerm, handleUpdateSearchParams]);

  useEffect(() => {
    const updateSearchParamInput = {
      [SearchParamKeys.sortBy]: sortDescriptor.column as string,
      [SearchParamKeys.sortDirection]: sortDescriptor.direction,
    };
    handleUpdateSearchParams(updateSearchParamInput);
  }, [sortDescriptor, handleUpdateSearchParams]);

  return (
    <AdvocateContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        sortDescriptor,
        setSortDescriptor,
        advocates,
        setAdvocates,
        isLoading: isFetching,
      }}
    >
      {children}
    </AdvocateContext.Provider>
  );
};
