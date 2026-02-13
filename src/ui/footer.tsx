import { cn } from "@/utils/cn";
import { ReferDialog } from "./refer-dialog";
import { useLoaderData } from "@tanstack/react-router";
import { Suspense, use } from "react";

export default function Footer() {
  return (
    <footer
      className={cn(
        `fixed bottom-0 left-0 w-full bg-blue-300 px-4 sm:px-10 md:px-20 lg:px-30 dark:bg-blue-900`,
      )}
    >
      <ReferDialog />

      <Suspense fallback={<>Loading...</>}>
        <Timer />
      </Suspense>
    </footer>
  );
}

function Timer() {
  const { promisedLatestEvent } = useLoaderData({ from: "/(auth)" });

  const latestEvent = use(promisedLatestEvent);

  if (!latestEvent) return <span>null</span>;

  return <span>{JSON.stringify(latestEvent)}</span>;
}
