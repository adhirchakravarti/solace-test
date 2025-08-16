import { NextRequest, NextResponse } from "next/server";
import { sql } from "drizzle-orm";

import db from "@/db";
import { advocates } from "@/db/schema";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const searchQuery = searchParams.get("searchTerm") ?? "";

  try {
    if (!searchQuery) {
      const data = await db.select().from(advocates);
      return NextResponse.json({ data, status: 200, ok: true });
    }
    const data = await db.select().from(advocates).where(sql`(
      setweight(to_tsvector('english', ${advocates.firstName}), 'A') ||
      setweight(to_tsvector('english', ${advocates.lastName}), 'A') ||
      setweight(to_tsvector('english', ${advocates.city}), 'B') ||
      setweight(to_tsvector('english', ${advocates.degree}), 'B') ||
      setweight(to_tsvector('english', ${advocates.specialties}), 'C') ||
      setweight(to_tsvector('english', ${advocates.yearsOfExperience}::text), 'D') ||
      setweight(to_tsvector('english', ${advocates.phoneNumber}::text), 'D')
      @@ to_tsquery('english', ${searchQuery})
    )`);
    return NextResponse.json({ data, status: 200, ok: true });
  } catch (error) {
    return NextResponse.json({ data: null, error: "Failed to fetch advocates", status: 500 });
  }
}
