import { fetchSession } from "@/lib/auth/session";
import { authMiddleware } from "@/middleware/auth";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { SigninSearchParams } from "../(guest)/signin";
import Navbar from "@/ui/navabr";
import { getUserDetails } from "@/integrations/server-function/db-querry/users";
import Footer from "@/ui/footer";
import { cn } from "@/utils/cn";

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

    if (!session) throw new Error();

    const userDetails = await getUserDetails({
      data: { email: session.user.email },
    });

    if (!userDetails) throw new Error();

    const { id, role } = userDetails;

    return { session, role, userid: id };
  },
});

function RouteComponent() {
  return (
    <>
      <Navbar />
      <main className={cn(`pt-10 pb-20`)}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
