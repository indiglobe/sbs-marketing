import {
  mysqlTable,
  timestamp,
  char,
  mysqlEnum,
  varchar,
  date,
  foreignKey,
} from "drizzle-orm/mysql-core";

export const roleEnums = mysqlEnum(["super-admin", "admin"]);

export const UsersTable = mysqlTable(
  "users",
  {
    id: char("id", { length: 8 }).primaryKey(),
    firstName: varchar("first_name", { length: 255 }).notNull(),
    lastName: varchar("last_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    city: varchar("city", { length: 255 }).notNull(),
    role: roleEnums.$default(() => "admin").notNull(),
    mobile: varchar("mobile", { length: 255 }).notNull(),
    referredBy: char("referred_by", { length: 8 }),
    avatarURL: varchar("avatar_url", { length: 255 }),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
  },

  (table) => [
    foreignKey({
      columns: [table.referredBy],
      foreignColumns: [table.id],
    })
      .onDelete("set null")
      .onUpdate("cascade"),
  ],
);

export const EventsTable = mysqlTable("events", {
  id: char("id", { length: 8 }).primaryKey(),
  scheduledFor: date({ mode: "date" }).notNull(),
});

export const KYCTable = mysqlTable("kyc", {
  aadhar: char("aadhar", { length: 12 }).primaryKey(),
  PAN: char("pan", { length: 10 }).notNull(),
  bankAccountNo: char("bank_account", { length: 30 }).notNull(),
  branchName: char("branch_name", { length: 127 }).notNull(),
  bankName: char("bank_name", { length: 255 }).notNull(),
  accountHolder: char("account_holder", { length: 255 }).notNull(),
  IFSC: char("ifsc", { length: 255 }).notNull(),

  detailsOf: char("details_of", { length: 8 })
    .notNull()
    .references(() => UsersTable.id),
});
