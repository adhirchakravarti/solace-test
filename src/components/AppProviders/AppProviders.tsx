"use client";

import React from "react";
import { AdvocateProvider } from "@/feature-components/AdvocateListView/advocate-context";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <AdvocateProvider>{children}</AdvocateProvider>;
}
