import { generateNumericId } from "@/utils/id";
import {
  mysqlTable,
  text,
  timestamp,
  char,
  mysqlEnum,
  varchar,
} from "drizzle-orm/mysql-core";

export const roleEnums = mysqlEnum(["super-admin", "admin"]);

export const users = mysqlTable("users", {
  id: char({ length: 10 })
    .primaryKey()
    .$defaultFn(() => generateNumericId()),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
  password: varchar("password", { length: 255 }).notNull(),
  plainPassword: varchar("plain_password", { length: 255 }).notNull(),
  role: roleEnums.$default(() => "admin").notNull(),
});
