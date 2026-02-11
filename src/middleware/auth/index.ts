import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { SigninSearchParams } from "@/routes/(guest)/signin/index";
import { fetchSession } from "@/lib/auth/session";

export const authMiddleware = createMiddleware().server(async ({ next }) => {
  const request = getRequest();
  const session = await fetchSession();

  if (!session) {
    throw redirect({
      to: "/signin",
      search: {
        callbackUrl: request.url,
      } satisfies SigninSearchParams,
    });
  }

  return await next();
});
