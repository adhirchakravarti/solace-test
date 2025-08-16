"use client";

import React, { useEffect } from "react";

import type { SelectAdvocates } from "@/db/schema";

import { useAdvocateContext } from "@/features/AdvocateListView/advocate-context";
import { AdvocateList } from "@/features/AdvocateListView/AdvocateList/AdvocateList";
import { AdvocateSearch } from "@/features/AdvocateListView/AdvocateSearch/AdvocateSearch";

interface AdvocateListViewProps {
  advocates: SelectAdvocates[];
}

export function AdvocateListView({ advocates }: AdvocateListViewProps) {
  const { setAdvocates } = useAdvocateContext();

  useEffect(() => {
    setAdvocates(advocates);
  }, [advocates, setAdvocates]);

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <AdvocateSearch />
      <br />
      <br />
      <AdvocateList />
      <br />
      <br />
    </main>
  );
}
