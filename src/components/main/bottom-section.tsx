import { getUpcomingEventServerFn } from "@/server-functions/db-model/events";
import BottomReferButton from "@/ui/bottom-refer-button";
import { Countdown } from "@/ui/countdown";
import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";

export default function BottomSection() {
  const [isRendered, setIsRendered] = useState(false);
  const [countDownDate, setCountDownDate] = useState("");

  useEffect(() => {
    setIsRendered(!isRendered);

    (async () => {
      const upComingEventDate = await getUpcomingEventServerFn();

      setCountDownDate(upComingEventDate.scheduledFor.toString());
    })();
  }, []);

  if (!isRendered) {
    return <></>;
  }

  return (
    <div
      className={cn(
        `px-4 sm:px-6 lg:px-8`,
        `bg-brand-200 fixed bottom-0 left-0 flex w-full flex-col items-center justify-between gap-y-4 pt-10 pb-4 md:flex-row`,
      )}
    >
      <BottomReferButton />
      <Countdown targetDate={new Date(countDownDate)} />
    </div>
  );
}
