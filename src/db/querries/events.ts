import { desc } from "drizzle-orm";
import { db } from "..";
import { EventsTable } from "../schema";

export async function getUpcomingEvent() {
  const lastEvent = (
    await db
      .select()
      .from(EventsTable)
      .orderBy(desc(EventsTable.scheduledFor))
      .limit(1)
  )[0];

  return lastEvent;
}
