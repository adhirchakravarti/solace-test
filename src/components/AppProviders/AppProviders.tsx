"use client";

import React from "react";
import { HeroUIProvider } from "@heroui/react";

import { AdvocateProvider } from "@/features/AdvocateListView/advocate-context";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <AdvocateProvider>{children}</AdvocateProvider>
    </HeroUIProvider>
  );
}
