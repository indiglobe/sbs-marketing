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
    <div className="flex gap-4 text-center">
      <TimeBox label="Days" value={timeLeft.days} />
      <TimeBox label="Hours" value={timeLeft.hours} />
      <TimeBox label="Min" value={timeLeft.minutes} />
      <TimeBox label="Sec" value={timeLeft.seconds} />
    </div>
  );
}

function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-background flex flex-col items-center rounded-lg px-4 py-3 shadow-sm">
      <span className="text-foreground text-2xl font-bold">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-foreground/70 text-xs tracking-wider uppercase">
        {label}
      </span>
    </div>
  );
}
