"use client";

import React from "react";

import { Input } from "@heroui/react";

import { useAdvocateContext } from "@/features/AdvocateListView/advocate-context";

export function AdvocateSearch() {
  const { searchTerm, setSearchTerm } = useAdvocateContext();

  const handleValueChange = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex flex-row gap-4 items-center justify-center w-full md:w-1/2  lg:w-1/2">
        <Input
          radius="sm"
          size="md"
          type="text"
          isClearable
          onClear={() => setSearchTerm("")}
          placeholder="Search based on name, city, degree or specialization"
          variant="bordered"
          onValueChange={handleValueChange}
          value={searchTerm}
        />
      </div>
    </div>
  );
}
