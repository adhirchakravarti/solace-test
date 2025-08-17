"use client";

import React from "react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Spinner,
} from "@heroui/react";

import { useAdvocateContext } from "@/features/AdvocateListView/advocate-context";
import type { AdvocatesSortDescriptor } from "@/features/AdvocateListView/types";

const COLUMNS = [
  {
    key: "firstName",
    label: "FIRST NAME",
    sortable: true,
  },
  {
    key: "lastName",
    label: "LAST NAME",
    sortable: true,
  },
  {
    key: "city",
    label: "CITY",
    sortable: true,
  },
  {
    key: "degree",
    label: "DEGREE",
    sortable: true,
  },
  {
    key: "specialties",
    label: "SPECIALTIES",
  },
  {
    key: "yearsOfExperience",
    label: "YEARS OF EXPERIENCE",
    sortable: true,
  },
  {
    key: "phoneNumber",
    label: "PHONE NUMBER",
    sortable: true,
  },
];

export function AdvocateList() {
  const {
    advocates,
    searchTerm,
    sortDescriptor,
    setSortDescriptor,
    isLoading,
  } = useAdvocateContext();

  const handleSortChange = (sortDescriptor: AdvocatesSortDescriptor) => {
    const { column, direction } = sortDescriptor;
    setSortDescriptor({
      column,
      direction,
    });
  };

  return (
    <Table
      aria-label={
        "Advocate table with name, city," +
        " degree, specialties, years of experience" +
        " and phone number"
      }
      sortDescriptor={sortDescriptor}
      onSortChange={handleSortChange}
    >
      <TableHeader columns={COLUMNS}>
        {(column) => (
          <TableColumn key={column.key} allowsSorting={column.sortable}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={advocates}
        isLoading={isLoading}
        loadingContent={<Spinner label="Loading..." />}
        {...(advocates.length === 0 && {
          emptyContent: searchTerm.length
            ? "The current search filter returned no rows."
            : "No rows to display.",
        })}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => {
              const value = getKeyValue(item, columnKey);
              const formattedValue = Array.isArray(value)
                ? value.join(", ")
                : value;
              return <TableCell>{formattedValue}</TableCell>;
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
