import type { SortDescriptor } from "@heroui/react";

import {
  SearchParamKeys,
  SortDirections,
} from "@/features/AdvocateListView/constants";

export type SortDirection =
  | SortDirections.ascending
  | SortDirections.descending;

export type AdvocatesSortDescriptor = SortDescriptor & {
  column: React.Key;
  direction: string;
};

export type HandleUpdateSearchParamsInput = {
  [key in SearchParamKeys]?: string;
};
