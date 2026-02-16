import {
  mysqlTable,
  int,
  varchar,
  mysqlEnum,
  foreignKey,
  datetime,
  char,
} from "drizzle-orm/mysql-core";

export const role = mysqlEnum(["admin", "basic"]);

export const UserTable = mysqlTable(
  "users",
  {
    id: char("id", { length: 8 }).primaryKey(),
    password: varchar("password", { length: 127 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    city: varchar("city", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 255 }).notNull(),
    role: role.notNull().default("basic"),
    referredBy: char("referred_by", { length: 8 }),
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

  kycOfUserId: varchar("kyc_of_user_id", { length: 255 })
    .notNull()
    .unique()
    .references(() => UserTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
});

export const EventsTable = mysqlTable("events", {
  id: int("id").primaryKey().autoincrement(),
  eventDate: datetime("event_date", { mode: "date" }).notNull(),
});

// export const UserTable = mysqlTable(
//   "users",
//   {
//     id: char("id", { length: 8 }).primaryKey(),
//     password: varchar("password", { length: 127 }).notNull(),
//     name: varchar("name", { length: 255 }).notNull(),
//     email: varchar("email", { length: 255 }).notNull().unique(),
//     role: role.notNull().default("basic"),
//     avatarUrl: varchar("avatar_url", { length: 255 }),
//     city: varchar("city", { length: 255 }).notNull(),
//     phone: varchar("phone", { length: 255 }).notNull(),
//     referredBy: char("referred_by", { length: 8 }),
//   },
//   (table) => [
//     foreignKey({
//       columns: [table.referredBy],
//       foreignColumns: [table.id],
//     })
//       .onDelete("set null")
//       .onUpdate("cascade"),
//   ],
// );

// export const KycTable = mysqlTable("kyc", {
//   id: int("id").primaryKey().autoincrement(),
//   aadhar: varchar("aadhar", { length: 255 }).notNull(),
//   pan: varchar("pan", { length: 255 }).notNull(),
//   bankAccount: varchar("bank_account", { length: 255 }).notNull(),
//   bankName: varchar("bank_name", { length: 255 }).notNull(),
//   branchName: varchar("branch_name", { length: 255 }).notNull(),
//   accountHolderName: varchar("account_holder_name", { length: 255 }).notNull(),
//   ifsc: varchar("ifsc", { length: 255 }).notNull(),

//   kycOfUserEmail: varchar("kyc_of_user_email", { length: 255 })
//     .notNull()
//     .unique()
//     .references(() => UserTable.email, {
//       onDelete: "cascade",
//       onUpdate: "cascade",
//     }),
// });
