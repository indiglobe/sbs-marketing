import { db } from "@/db";
import { EventsTable } from "@/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { asc, eq, gt } from "drizzle-orm";

export const upcomingEvent = createServerFn().handler(async () => {
  const event = (
    await db
      .select()
      .from(EventsTable)
      .where(gt(EventsTable.eventDate, new Date()))
      .orderBy(asc(EventsTable.eventDate))
      .limit(1)
  )[0];

  if (!event) return null;

  return event.eventDate;
});

export const allEvents = createServerFn().handler(async () => {
  const events = await db.select().from(EventsTable);

  return events;
});

export const addNewEvent = createServerFn()
  .inputValidator((d: { eventDate: string }) => d)
  .handler(async ({ data: { eventDate } }) => {
    await db.insert(EventsTable).values({ eventDate: new Date(eventDate) });
  });

export const deleteEvent = createServerFn()
  .inputValidator((d: { id: number }) => d)
  .handler(async ({ data: { id } }) => {
    await db.delete(EventsTable).where(eq(EventsTable.id, id));
  });
