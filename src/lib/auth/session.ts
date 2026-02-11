import { createServerFn } from "@tanstack/react-start";
import { auth } from "./config";
import { getRequestHeaders } from "@tanstack/react-start/server";

export const fetchSession = createServerFn().handler(async () => {
  const headers = getRequestHeaders();
  const session = await auth.api.getSession({ headers });

  return session;
});
