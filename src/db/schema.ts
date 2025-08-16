import { sql, type InferSelectModel } from "drizzle-orm";
import {
  pgSchema,
  integer,
  text,
  jsonb,
  serial,
  timestamp,
  bigint,
  index,
} from "drizzle-orm/pg-core";

export const solaceHealthSchema = pgSchema("SolaceHealth");

export const advocates = solaceHealthSchema.table(
  "advocates",
  {
    id: serial("id").primaryKey(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    city: text("city").notNull(),
    degree: text("degree").notNull(),
    specialties: jsonb("payload").default([]).notNull().$type<string[]>(),
    yearsOfExperience: integer("years_of_experience").notNull(),
    phoneNumber: bigint("phone_number", { mode: "number" }).notNull(),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  },
  // https://github.com/drizzle-team/drizzle-orm/issues/3873
  // Wasn't able to generate indexes unless I used the following syntax
  // @ts-expect-error Type 'IndexBuilder[]' is not assignable to type 'PgTableExtraConfig'.
  //  Index signature for type 'string' is missing in type 'IndexBuilder[]'.ts(2345)
  (table) => [
    index('search_index').using('gin', sql`(
      setweight(to_tsvector('english', ${table.firstName}), 'A') ||
      setweight(to_tsvector('english', ${table.lastName}), 'A') ||
      setweight(to_tsvector('english', ${table.city}), 'B') ||
      setweight(to_tsvector('english', ${table.degree}), 'B') ||
      setweight(to_tsvector('english', ${table.specialties}), 'C') ||
      setweight(to_tsvector('english', ${table.yearsOfExperience}), 'D') ||
      setweight(to_tsvector('english', ${table.phoneNumber}), 'D')
    )`),
  ],
);

export type SelectAdvocates = InferSelectModel<typeof advocates>;
