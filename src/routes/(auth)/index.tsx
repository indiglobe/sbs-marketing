import BottomSection from "@/components/main/bottom-section";
import UserTree from "@/components/main/user-tree";
import { Avatar } from "@/ui/avatar";
import { fetchSession } from "@/utils/auth";
import { cn } from "@/utils/cn";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/")({
  component: RouteComponent,

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
    <main className={cn(`px-4 py-4 sm:px-6 lg:px-8`, `grow`)}>
      <div className={cn(`md:hidden`)}>
        <Avatar />
      </div>

      <div
        className={cn(
          `border-brand-200 m-auto aspect-video w-full max-w-200 rounded-md border p-4`,
        )}
      >
        <UserTree />
      </div>

      <BottomSection />
    </main>
  );
}
