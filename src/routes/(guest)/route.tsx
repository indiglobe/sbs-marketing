import { fetchSession } from "@/lib/auth/session";
import { guestMiddleware } from "@/middleware/guest";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(guest)")({
  component: RouteComponent,

  beforeLoad: async () => {
    const session = await fetchSession();

    if (session) {
      throw redirect({ to: "/dashboard" });
    }
  },

  server: {
    middleware: [guestMiddleware],
  },
});

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
