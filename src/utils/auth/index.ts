import { getCookie } from "@tanstack/react-start/server";
import { SESSION } from "@/utils/cookies/names";
import { verifyToken } from "./token";
import { createServerFn } from "@tanstack/react-start";

/**
 * Server-side function that checks whether the current request
 * has a valid session.
 *
 * It:
 * - Reads the session token from cookies
 * - Verifies the token's validity
 * - Returns a boolean indicating authentication status
 *
 * @returns {Promise<boolean>} `true` if the session exists and is valid, otherwise `false`
 */
export const fetchSession = createServerFn({ method: "GET" }).handler(() => {
  // Retrieve the session token from cookies
  const session = getCookie(SESSION);

  // No session cookie found
  if (!session) {
    return false;
  }

  try {
    // Verify the session token (e.g., JWT validation)
    const isSessionValid = verifyToken(session);

    // Token verification failed
    if (!isSessionValid) {
      return false;
    }
  } catch (error) {
    // Token verification threw an error (expired, malformed, etc.)
    return false;
  }

  // Session exists and token is valid
  return true;
});
