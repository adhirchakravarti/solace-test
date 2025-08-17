"use client";

import React from "react";

import { Button, Input } from "@heroui/react";

import { useAdvocateContext } from "@/features/AdvocateListView/advocate-context";

export function AdvocateSearch() {
  const { searchTerm, setSearchTerm } = useAdvocateContext();

  const handleValueChange = (value: string) => {
    const searchTerm = value.toLowerCase();
    setSearchTerm(searchTerm);
  };

  const handleButtonPress = () => {
    setSearchTerm("");
  };

  return (
    <div className="flex flex-col gap-4">
      <p>
        Searching for: <span id="search-term">{searchTerm.trim()}</span>
      </p>
      <div className="flex flex-row gap-4 lg:w-lg md:w-md items-center justify-center">
        <Input
          className="w-full"
          radius="sm"
          size="md"
          type="search"
          pattern="^[A-Za-z0-9]+(?:['-][A-Za-z0-9]+)*(?:\s+[A-Za-z0-9]+(?:['-][A-Za-z0-9]+)*)*$"
          placeholder="Search based on name, city, degree or specialization"
          variant="bordered"
          onValueChange={handleValueChange}
          value={searchTerm}
        />
        <Button size="sm" onPress={handleButtonPress}>
          Reset
        </Button>
      </div>
    </div>
  );
}
