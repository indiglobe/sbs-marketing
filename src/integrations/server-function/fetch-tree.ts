import { db } from "@/db";
import { UserTable } from "@/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { getTableColumns } from "drizzle-orm";

export const treeDataForUsers = createServerFn().handler(async () => {
  const { id, name, referredBy } = getTableColumns(UserTable);

  const userDetails = await db.select({ id, name, referredBy }).from(UserTable);

  return userDetails;
});
