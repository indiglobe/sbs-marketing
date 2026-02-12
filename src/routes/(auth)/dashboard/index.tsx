import { getUserDetails } from "@/integrations/server-function/db-querry/users";
import { fetchSession } from "@/lib/auth/session";
import { checkUserMiddleware } from "@/middleware/check-user";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/dashboard/")({
  component: RouteComponent,

  beforeLoad: async () => {
    const session = await fetchSession();

    if (!session) {
      throw new Error();
    }

    const {
      user: { email },
    } = session;

    const userDetaisFromDB = await getUserDetails({ data: { email } });

    if (!userDetaisFromDB) {
      throw redirect({ to: "/welcome" });
    }
  },

  server: {
    middleware: [checkUserMiddleware],
  },
});

function RouteComponent() {
  return <div>Hello "/(auth)/dashboard/"!</div>;
}
