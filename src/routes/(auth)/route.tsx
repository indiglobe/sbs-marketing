import { fetchSession } from "@/lib/auth/session";
import { authMiddleware } from "@/middleware/auth";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { SigninSearchParams } from "../(guest)/signin";
import Navbar from "@/ui/navbar";
// import Footer from "@/ui/footer";
import { cn } from "@/utils/cn";
import { BeforeLoadRouterContext } from "@/router";
import { getUserDetails } from "@/integrations/server-function/db-querry/users";
import { getLatestEvent } from "@/integrations/server-function/db-querry/events";

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

    const {
      user: { email },
    } = session;

    const userDetails = await getUserDetails({ data: { email } });

    return { session, userDetails } satisfies BeforeLoadRouterContext;
  },

  server: {
    middleware: [authMiddleware],
  },

  loader: async () => {
    const promisedLatestEvent = getLatestEvent();

    return { promisedLatestEvent };
  },
});

function RouteComponent() {
  return (
    <>
      <Navbar />
      <main className={cn(`px-4 pt-10 pb-20 sm:px-10 md:px-20 lg:px-30`)}>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
}
