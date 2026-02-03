import z from "zod";
import { generateToken } from "@/utils/auth/token";
import { verifyPassword } from "@/utils/password";
import { createServerFn } from "@tanstack/react-start";
import { setCookie } from "@tanstack/react-start/server";
import { SESSION } from "@/utils/cookies/names";
import { getUserById } from "@/db/querries/users";

/**
 * Zod schema used to validate login form input.
 *
 * - `userid`: exactly 8 characters
 * - `password`: between 8 and 16 characters
 */
export const LoginFormSchema = z.object({
  userid: z.string().min(8).max(8),
  password: z.string().min(8).max(16),
});

/** Represents a successful login response */
type Success = {
  status: "success";
};

/** Represents an error response with field-specific info */
type Error = {
  status: "error";
  errorField: keyof z.infer<typeof LoginFormSchema>;
  errorMessage: string;
};

/** Union type for login server function response */
export type LoginServerFnResponse = Success | Error;

/**
 * Server-side login handler.
 *
 * This function:
 * - Validates input using `LoginFormSchema`
 * - Fetches the user from the database via `getUserById()`
 * - Verifies the provided password
 * - Generates a session token
 * - Stores the session token in an HTTP-only cookie
 * - Returns a structured response object for success or error
 *
 * @returns {Promise<LoginServerFnResponse>} Structured response
 */
export const loginServerFn = createServerFn({ method: "POST" })
  .inputValidator(LoginFormSchema)
  .handler(async ({ data: { password: userProvidedPW, userid } }) => {
    // Fetch user by user ID
    const user = await getUserById({ userid });

    // If user not found, return structured error
    if (!user) {
      return {
        status: "error",
        errorField: "userid",
        errorMessage: "User does not exist",
      } satisfies LoginServerFnResponse;
    }

    const { password: hashedPWFromDB, fullName, role } = user;

    // Verify provided password against stored hash
    const isPasswordValid = await verifyPassword(
      userProvidedPW,
      hashedPWFromDB,
    );

    // Abort login if password is invalid
    if (!isPasswordValid) {
      return {
        status: "error",
        errorField: "password",
        errorMessage: "Please provide correct password",
      } satisfies LoginServerFnResponse;
    }

    // Generate a session token for the authenticated user
    const sessionToken = generateToken({ userid, fullName, role });

    // Store the session token in an HTTP-only cookie
    setCookie(SESSION, sessionToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24, // 24 hours
    });

    // Return success — client can redirect after receiving this
    return {
      status: "success",
    } satisfies LoginServerFnResponse;
  });
