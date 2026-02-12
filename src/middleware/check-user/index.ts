import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { fetchSession } from "@/lib/auth/session";
import { getUserDetails } from "@/integrations/server-function/db-querry/users";

export const checkUserMiddleware = createMiddleware().server(
  async ({ next }) => {
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

    return await next();
  },
);
