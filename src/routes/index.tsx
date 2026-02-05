import { Avatar } from "@/components/avatar";
import BottomReferButton from "@/components/bottom-refer-button";
import { Countdown } from "@/components/countdown";
// import NameWithRank from "@/components/name-with-rank";
import { Navbar } from "@/components/navbar";
import { fetchSession } from "@/utils/auth";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,

  beforeLoad: async () => {
    const session = await fetchSession();

    if (!session) {
      throw redirect({ to: "/login" });
    }
  },

  loader: async () => {
    const session = await fetchSession();

    if (!session) {
      return { userid: null };
    }

    return {
      userid: session.userid,
    };
  },
});

function RouteComponent() {
  return (
    <main>
      <Navbar />
      <div>
        {/* <NameWithRank /> */}
        <Avatar />
      </div>
      <div className="fixed bottom-0 flex w-full items-center justify-between">
        <BottomReferButton />
        <Countdown targetDate={new Date("2026-02-10")} />
      </div>
    </main>
  );
}
