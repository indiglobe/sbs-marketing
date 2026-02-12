import { mysqlTable, int, varchar, mysqlEnum } from "drizzle-orm/mysql-core";

export const role = mysqlEnum(["admin", "basic"]);

export const UserTable = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  role: role.$defaultFn(() => "basic"),
  avatarUrl: varchar("avatar_url", { length: 255 }),
  city: varchar("city", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 255 }).notNull(),
});
