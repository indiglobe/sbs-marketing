import { fetchSession } from "@/lib/auth/session";
import { authMiddleware } from "@/middleware/auth";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { SigninSearchParams } from "../(guest)/signin";
import Navbar from "@/components/navabr";

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

  loader: async () => {
    const session = await fetchSession();

    return { session };
  },
});

function RouteComponent() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
