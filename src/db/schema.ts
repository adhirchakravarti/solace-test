import { sql, type InferSelectModel  } from "drizzle-orm";
import {
  pgSchema,
  integer,
  text,
  jsonb,
  serial,
  timestamp,
  bigint,
} from "drizzle-orm/pg-core";

export const solaceHealthSchema = pgSchema('SolaceHealth');

const advocates = solaceHealthSchema.table("advocates", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  city: text("city").notNull(),
  degree: text("degree").notNull(),
  specialties: jsonb("payload").default([]).notNull().$type<string[]>(),
  yearsOfExperience: integer("years_of_experience").notNull(),
  phoneNumber: bigint("phone_number", { mode: "number" }).notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

type SelectAdvocates = InferSelectModel<typeof advocates>;

export { advocates, type SelectAdvocates };
