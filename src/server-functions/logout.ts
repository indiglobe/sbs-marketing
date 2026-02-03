import { createServerFn } from "@tanstack/react-start";
import { setCookie } from "@tanstack/react-start/server";
import { SESSION } from "@/utils/cookies/names";

/**
 * Represents a successful logout response
 */
type LogoutSuccess = {
  status: "success";
};

/**
 * Represents an error response during logout
 */
type LogoutError = {
  status: "error";
  errorMessage: string;
};

/**
 * Union type for logout server function response
 */
export type LogoutServerFnResponse = LogoutSuccess | LogoutError;

/**
 * Server-side logout handler.
 *
 * This function:
 * - Invalidates the user's session by clearing the HTTP-only session cookie
 * - Returns a structured response indicating success or failure
 *
 * @returns {Promise<LogoutServerFnResponse>} Structured logout response
 *
 * @example
 * // Client usage:
 * const response = await logoutServerFn.mutate();
 * if (response.status === "success") {
 *   // Redirect to login page or show a message
 * }
 */
export const logoutServerFn = createServerFn({ method: "POST" }).handler(
  async () => {
    try {
      // Clear the session cookie by setting it with maxAge=0
      setCookie(SESSION, "", {
        httpOnly: true,
        maxAge: 0, // Immediately expires the cookie
      });

      return {
        status: "success",
      } satisfies LogoutServerFnResponse;
    } catch (err) {
      // Fallback error if cookie clearing fails for some reason
      return {
        status: "error",
        errorMessage: "Failed to log out user",
      } satisfies LogoutServerFnResponse;
    }
  },
);
