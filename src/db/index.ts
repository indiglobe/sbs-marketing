import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema.ts";
import { env } from "@/lib/env/index.ts";

const connection = await mysql.createConnection(env.DATABASE_URL);

export const db = drizzle(connection, { schema, mode: "default" });
