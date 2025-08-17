"use client";

import dynamic from "next/dynamic";

import React from "react";

import { HeroUIProvider } from "@heroui/react";

import { AdvocateProvider } from "@/features/AdvocateListView/advocate-context";

// Dynamically import the ThemeProvider to avoid server hydration errors
const NextThemesProvider = dynamic(
  () => import("next-themes").then((module) => module.ThemeProvider),
  { ssr: false }
);

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <AdvocateProvider>{children}</AdvocateProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
