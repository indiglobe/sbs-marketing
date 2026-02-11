import { fetchSession } from "@/lib/auth/session";
import { authMiddleware } from "@/middleware/auth";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { SigninSearchParams } from "../(guest)/signin";

export const Route = createFileRoute("/(auth)")({
  component: RouteComponent,

  beforeLoad: async ({ location }) => {
    const session = await fetchSession();

    if (!session) {
      throw redirect({
        to: "/signin",
        search: {
          callbackUrl: location.href,
        } satisfies SigninSearchParams,
      });
    }
  },

  server: {
    middleware: [authMiddleware],
  },
});

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
