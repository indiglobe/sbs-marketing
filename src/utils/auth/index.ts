import { getCookie } from "@tanstack/react-start/server";
import { session as sessionCookie } from "@/utils/cookies/names";
import { verifyToken } from "./token";
import { createServerFn } from "@tanstack/react-start";

export const fetchSession = createServerFn({ method: "GET" }).handler(() => {
  const session = getCookie(sessionCookie);

  if (!session) {
    return false;
  }

  try {
    const isSessionValid = verifyToken(session);

    if (!isSessionValid) {
      return false;
    }
  } catch (error) {
    return false;
  }

  return true;
});
