import { NextRequest, NextResponse } from "next/server";
import { asc, desc, sql } from "drizzle-orm";

import db from "@/db";
import { advocates } from "@/db/schema";
import { SortDirections } from "@/features/AdvocateListView/constants";
import { PgColumn } from "drizzle-orm/pg-core";

const searchParamToDbColumnMap: Record<string, PgColumn> = {
  firstName: advocates.firstName,
  lastName: advocates.lastName,
  city: advocates.city,
  degree: advocates.degree,
  specialties: advocates.specialties,
  yearsOfExperience: advocates.yearsOfExperience,
  phoneNumber: advocates.phoneNumber,
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const searchQuery = searchParams.get("searchTerm") ?? "";
  const sortBy = searchParams.get("sortBy") ?? "firstName";
  const orderByColumn =
    sortBy && sortBy in advocates
      ? searchParamToDbColumnMap[sortBy]
      : advocates.firstName;
  const sortDirection =
    searchParams.get("sortDirection") ?? SortDirections.ascending;
  const sortOperation = sortDirection === SortDirections.ascending ? asc : desc;

  try {
    if (!searchQuery) {
      const data = await db
        .select()
        .from(advocates)
        .orderBy(sortOperation(orderByColumn));
      return NextResponse.json({ data, status: 200, ok: true });
    }
    const data = await db
      .select()
      .from(advocates)
      .where(
        sql`(
      setweight(to_tsvector('english', ${advocates.firstName}), 'A') ||
      setweight(to_tsvector('english', ${advocates.lastName}), 'A') ||
      setweight(to_tsvector('english', ${advocates.city}), 'B') ||
      setweight(to_tsvector('english', ${advocates.degree}), 'B') ||
      setweight(to_tsvector('english', ${advocates.specialties}), 'C') ||
      setweight(to_tsvector('english', ${advocates.yearsOfExperience}::text), 'D') ||
      setweight(to_tsvector('english', ${advocates.phoneNumber}::text), 'D')
      @@ to_tsquery('english', ${searchQuery})
    )`
      )
      .orderBy(sortOperation(orderByColumn));
    return NextResponse.json({ data, status: 200, ok: true });
  } catch (error) {
    return NextResponse.json({
      data: null,
      error: "Failed to fetch advocates",
      status: 500,
    });
  }
}
