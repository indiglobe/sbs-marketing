import BottomReferButton from "@/ui/bottom-refer-button";
import { Countdown } from "@/ui/countdown";
import { cn } from "@/utils/cn";

export default function BottomSection() {
  return (
    <div
      className={cn(
        `px-4 sm:px-6 lg:px-8`,
        `bg-brand-200 fixed bottom-0 left-0 flex w-full flex-col items-center justify-between gap-y-4 pt-10 pb-4 md:flex-row`,
      )}
    >
      <BottomReferButton />
      <Countdown targetDate={new Date("2026-02-10")} />
    </div>
  );
}
