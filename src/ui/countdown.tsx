import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";

type CountdownProps = {
  targetDate: Date | string;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calculateTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - new Date().getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function Countdown({ targetDate }: CountdownProps) {
  const target = new Date(targetDate);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(target));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(target));
    }, 1000);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <div
      className={cn(
        `flex flex-col gap-x-4 gap-y-2 lg:flex-row lg:items-center`,
      )}
    >
      <div className={cn(`text-brand-600 text-center text-2xl font-bold`)}>
        Time untill next monthely reward closing
      </div>
      <div className="m-auto flex max-w-max gap-1 text-center md:m-0 md:ml-auto lg:flex-row">
        <TimeBox label="Days" value={timeLeft.days} />
        <TimeBox label="Hours" value={timeLeft.hours} />
        <TimeBox label="Min" value={timeLeft.minutes} />
        <TimeBox label="Sec" value={timeLeft.seconds} />
      </div>
    </div>
  );
}

function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="border-brand-500 bg-brand-100 flex flex-col items-center rounded-lg border px-2 py-1 shadow-sm">
      <span className="text-foreground relative size-10 text-2xl font-bold">
        <span
          className={cn(
            `text-brand-600 absolute inset-0 flex items-center justify-center`,
          )}
        >
          {String(value).padStart(2, "0")}
        </span>
      </span>
      <span className="text-foreground/70 text-xs tracking-wider uppercase">
        {label}
      </span>
    </div>
  );
}
