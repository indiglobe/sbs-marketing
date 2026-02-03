import {
  mysqlTable,
  text,
  timestamp,
  char,
  mysqlEnum,
  varchar,
  foreignKey,
} from "drizzle-orm/mysql-core";

export const roleEnums = mysqlEnum(["super-admin", "admin"]);

export const UsersTable = mysqlTable(
  "users",
  {
    id: char("id", { length: 8 }).primaryKey(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
    password: varchar("password", { length: 255 }).notNull(),
    role: roleEnums.$default(() => "admin").notNull(),
    referredBy: char("referred_by", { length: 8 }),
    avatarURL: varchar("avatar_url", { length: 255 }),
    city: varchar("city", { length: 255 }).notNull().unique(),
    email: varchar("email", { length: 255 }).notNull(),
    mobile: varchar("mobile", { length: 255 }).notNull(),
  },
  (table) => ({
    referredFk: foreignKey({
      columns: [table.referredBy],
      foreignColumns: [table.id],
    })
      .onDelete("set null")
      .onUpdate("cascade"),
  }),
);
