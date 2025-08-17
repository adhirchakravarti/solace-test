"use client";

import React, { useEffect } from "react";

import type { SelectAdvocates } from "@/db/schema";

import { useAdvocateContext } from "@/features/AdvocateListView/advocate-context";
import { AdvocateList } from "@/features/AdvocateListView/AdvocateList/AdvocateList";
import { AdvocateSearch } from "@/features/AdvocateListView/AdvocateSearch/AdvocateSearch";
import { useTheme } from "next-themes";
import { ThemeSwitch } from "@/components/ThemeSwitch/ThemeSwitch";

interface AdvocateListViewProps {
  advocates: SelectAdvocates[];
}

export function AdvocateListView({ advocates }: AdvocateListViewProps) {
  const { theme } = useTheme();
  const { setAdvocates } = useAdvocateContext();

  useEffect(() => {
    setAdvocates(advocates);
  }, [advocates, setAdvocates]);

  return (
    <main
      className={`${theme} text-foreground bg-background flex flex-col container mx-auto max-w-8xl z-10 px-6 min-h-[calc(100vh)] mb-12 grow gap-8`}
    >
      <div className="flex self-end">
        <ThemeSwitch />
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-normal text-center">
        Solace Health Advocates
      </h1>
      <AdvocateSearch />
      <AdvocateList />
    </main>
  );
}
