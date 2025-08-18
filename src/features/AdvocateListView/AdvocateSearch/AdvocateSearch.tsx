"use client";

import React, { SVGProps } from "react";

import { Input } from "@heroui/react";

import { useAdvocateContext } from "@/features/AdvocateListView/advocate-context";

const SearchIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

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
          startContent={
            <SearchIcon className="text-default-400 pointer-events-none shrink-0" />
          }
          variant="bordered"
          onValueChange={handleValueChange}
          value={searchTerm}
        />
      </div>
    </div>
  );
}
