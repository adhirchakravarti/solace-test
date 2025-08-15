"use client";

import React from "react";

import { useAdvocateContext } from "../advocate-context";

export function AdvocateSearch() {
  const { searchTerm, setSearchTerm } =
    useAdvocateContext();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.trim()?.toLowerCase();
    setSearchTerm(searchTerm);
  };

  const onClick = () => {
    setSearchTerm("");
  };

  return (
    <div>
      <p>Search</p>
      <p>
        Searching for: <span id="search-term">{searchTerm}</span>
      </p>
      <input
        style={{ border: "1px solid black" }}
        onChange={onChange}
        value={searchTerm}
      />
      <button onClick={onClick}>Reset Search</button>
    </div>
  );
}
