import 'dotenv/config';
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema";

const setup = () => {
  // for query purposes
  const queryClient = postgres(process.env.DATABASE_URL!, {
    database: "solaceassignment",
    fetch_types: true,
  });
  const db = drizzle(queryClient, {
    schema: schema,
  });
  return db;
};

export default setup();
