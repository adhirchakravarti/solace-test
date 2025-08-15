"use client";

import type { SelectAdvocates } from "@/db/schema";
import { typedFetch } from "@/utils/typedFetch";
import { useEffect, useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>();
  const [advocates, setAdvocates] = useState<SelectAdvocates[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<SelectAdvocates[]>(
    []
  );

  useEffect(() => {
    async function getAdvocates() {
      try {
        const advocateData = await typedFetch<{ data: SelectAdvocates[] }>(
          "/api/advocates"
        );
        if (advocateData?.data && advocateData.data.length) {
          setAdvocates(advocateData.data);
          setFilteredAdvocates(advocateData.data);
        }
      } catch (error) {
        console.warn('Error when fetching advocate list', error)
      }
    }
    getAdvocates();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.trim()?.toLowerCase();
    setSearchTerm(searchTerm);

    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(searchTerm) ||
        advocate.lastName.toLowerCase().includes(searchTerm) ||
        advocate.city.toLowerCase().includes(searchTerm) ||
        advocate.degree.toLowerCase().includes(searchTerm) ||
        advocate.specialties.some((s) =>
          s.toLowerCase().includes(searchTerm)
        ) ||
        advocate.yearsOfExperience.toString().includes(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    setFilteredAdvocates(advocates);
    setSearchTerm('')
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term">{searchTerm}</span>
        </p>
        <input style={{ border: "1px solid black" }} onChange={onChange} value={searchTerm} />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr key={advocate.id}>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s) => (
                    <div key={s}>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
