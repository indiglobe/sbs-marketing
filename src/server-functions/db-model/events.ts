import { getUpcomingEvent } from "@/db/querries/events";
import { createServerFn } from "@tanstack/react-start";

export const getUpcomingEventServerFn = createServerFn().handler(async () => {
  const resFromDB = await getUpcomingEvent();

  return resFromDB;
});
