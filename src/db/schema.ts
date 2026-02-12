import {
  mysqlTable,
  int,
  varchar,
  mysqlEnum,
  foreignKey,
} from "drizzle-orm/mysql-core";

export const role = mysqlEnum(["admin", "basic"]);

export const UserTable = mysqlTable(
  "users",
  {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    role: role.$defaultFn(() => "basic").notNull(),
    avatarUrl: varchar("avatar_url", { length: 255 }),
    city: varchar("city", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 255 }).notNull(),
    referredBy: int("referred_by"),
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

export const KycTable = mysqlTable("kyc", {
  id: int("id").primaryKey().autoincrement(),
  aadhar: varchar("aadhar", { length: 255 }).notNull(),
  pan: varchar("pan", { length: 255 }).notNull(),
  bankAccount: varchar("bank_account", { length: 255 }).notNull(),
  bankName: varchar("bank_name", { length: 255 }).notNull(),
  branchName: varchar("branch_name", { length: 255 }).notNull(),
  accountHolderName: varchar("account_holder_name", { length: 255 }).notNull(),
  ifsc: varchar("ifsc", { length: 255 }).notNull(),

  kycForUserId: int("kyc_for_user_id")
    .notNull()
    .references(() => UserTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
});
