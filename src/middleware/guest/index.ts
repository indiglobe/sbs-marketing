import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { fetchSession } from "@/lib/auth/session";

export const guestMiddleware = createMiddleware().server(async ({ next }) => {
  const session = await fetchSession();

  if (session) {
    throw redirect({ to: "/dashboard" });
  }

  return await next();
});
