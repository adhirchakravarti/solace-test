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
      className={`${theme} bg-gradient-light dark:bg-gradient-dark text-foreground w-full`}
    >
      <div className="flex flex-col grow container gap-8 mx-auto max-w-8xl px-6 py-6 min-h-[calc(100vh)] pb-12">
        <div className="flex self-end">
          <ThemeSwitch />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-normal text-center">
          Solace Health Advocates
        </h1>
        <AdvocateSearch />
        <AdvocateList />
      </div>
    </main>
  );
}
