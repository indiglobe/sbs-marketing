import { db } from "@/db";
import { EventsTable } from "@/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { asc, gte } from "drizzle-orm";

export const getLatestEvent = createServerFn().handler(async () => {
  const today = new Date();
  const latestEvent = (
    await db
      .select()
      .from(EventsTable)
      .where(gte(EventsTable.eventDate, today))
      .orderBy(asc(EventsTable.eventDate))
      .limit(1)
  )[0];

  if (!latestEvent) return null;

  return latestEvent;
});
