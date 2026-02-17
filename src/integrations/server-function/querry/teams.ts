import { db } from "@/db";
import { TeamTable } from "@/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { desc } from "drizzle-orm";

export const createNewTeam = createServerFn().handler(async () => {
  await db.insert(TeamTable).values({});

  const { id } = (
    await db.select().from(TeamTable).orderBy(desc(TeamTable.id))
  )[0];

  return { id };
});
