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
    <main className="flex flex-col container mx-auto max-w-8xl z-10 px-6 min-h-[calc(100vh)] mb-12 grow gap-8">
      <h1 className="text-4xl">Solace Advocates</h1>
      <AdvocateSearch />
      <AdvocateList />
    </main>
  );
}
