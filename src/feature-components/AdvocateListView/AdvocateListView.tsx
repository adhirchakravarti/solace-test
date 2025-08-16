"use client";

import React, { useEffect } from "react";
import { useAdvocateContext } from "./advocate-context";
import { AdvocateList } from "./AdvocateList/AdvocateList";

import type { SelectAdvocates } from "@/db/schema";
import { AdvocateSearch } from "./AdvocateSearch/AdvocateSearch";

interface AdvocateListViewProps {
  advocates: SelectAdvocates[];
}

export function AdvocateListView({ advocates }: AdvocateListViewProps) {
  const { setAdvocates } = useAdvocateContext();

  useEffect(() => {
    console.log({ advocates });
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
