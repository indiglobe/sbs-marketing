import { upcomingEvent } from "@/integrations/server-function/querry/events";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";

export function useLatestEvent() {
  const latestEvent = useServerFn(upcomingEvent);

  return useQuery({
    queryKey: ["latest-event"],
    queryFn: latestEvent,
  });
}
