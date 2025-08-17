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
} from "@heroui/react";

import { useAdvocateContext } from "@/features/AdvocateListView/advocate-context";

const COLUMNS = [
  {
    key: "firstName",
    label: "FIRST NAME",
  },
  {
    key: "lastName",
    label: "LAST NAME",
  },
  {
    key: "city",
    label: "CITY",
  },
  {
    key: "degree",
    label: "DEGREE",
  },
  {
    key: "specialties",
    label: "SPECIALTIES",
  },
  {
    key: "yearsOfExperience",
    label: "YEARS OF EXPERIENCE",
  },
  {
    key: "phoneNumber",
    label: "PHONE NUMBER",
  },
];

export function AdvocateList() {
  const { advocates, searchTerm } = useAdvocateContext();

  return (
    <Table aria-label="Advocate table with name, city, degree, specialties, years of experience and phone number">
      <TableHeader columns={COLUMNS}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        items={advocates}
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
