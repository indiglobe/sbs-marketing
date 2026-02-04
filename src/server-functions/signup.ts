import z from "zod";
import { encryptPassword } from "@/utils/password"; // function to hash password
import { generateToken } from "@/utils/auth/token";
import { createServerFn } from "@tanstack/react-start";
import { setCookie } from "@tanstack/react-start/server";
import { SESSION } from "@/utils/cookies/names";
import {
  insertUser,
  getUserByEmail,
  isValidRereralCode,
} from "@/db/querries/users";

/**
 * Zod schema used to validate signup form input.
 *
 * - `firstName`, `lastName`, `city`: non-empty strings
 * - `mobile`: exactly 10 digits
 * - `email`: valid email
 * - `password`: 8-16 characters
 * - `confirmPassword`: must match `password`
 */
export const SignupFormSchema = z
  .object({
    firstname: z.string().min(1, "First name is required"),
    lastname: z.string().min(1, "Last name is required"),
    city: z.string().min(1, "City is required"),
    mobile: z.string().regex(/^\d{10}$/, "Mobile number must be 10 digits"),
    email: z.email("Invalid email"),
    password: z.string().min(8).max(16),
    confirmPassword: z.string().min(8).max(16),
    referalCode: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/** Represents a successful signup response */
type Success = {
  status: "success";
};

/** Represents a structured error response */
type Error = {
  status: "error";
  errorField: keyof z.infer<typeof SignupFormSchema>;
  errorMessage: string;
};

/** Union type for signup server function response */
export type SignupServerFnResponse = Success | Error;

/**
 * Server-side signup handler.
 *
 * This function:
 * - Validates input using `SignupFormSchema`
 * - Checks for existing user by email or mobile
 * - Hashes the password
 * - Inserts a new user into the database
 * - Generates a session token
 * - Stores the session token in an HTTP-only cookie
 * - Returns a structured success or error response
 *
 * @returns {Promise<SignupServerFnResponse>} Structured response
 */
export const signupServerFn = createServerFn({ method: "POST" })
  .inputValidator(SignupFormSchema)
  .handler(async ({ data }) => {
    const { firstname, lastname, city, mobile, email, password } = data;

    // Check if user already exists by email or mobile
    const existingUser = await getUserByEmail({ email });

    if (existingUser) {
      return {
        status: "error",
        errorField: "email",
        errorMessage: "Email already registered",
      } satisfies SignupServerFnResponse;
    }

    console.log(data);

    let referalCode: string | null = data.referalCode ?? null;

    const isReferalCodeValid = await isValidRereralCode({
      code: referalCode ?? "",
    });

    if (!isReferalCodeValid) {
      referalCode = null;
    }

    // Hash the password before storing
    const hashedPassword = await encryptPassword(password);

    // Insert new user into database
    const newUser = await insertUser({
      firstName: firstname,
      lastName: lastname,
      password: hashedPassword,
      city,
      email,
      mobile,
      referredBy: referalCode,
    });

    // // Generate session token for the new user
    const sessionToken = generateToken({
      userid: newUser.id,
      fullName: `${newUser.firstName} ${newUser.lastName}`,
      role: newUser.role!,
    });

    // // Store token in HTTP-only cookie
    setCookie(SESSION, sessionToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24, // 24 hours
    });

    // Return success response
    return {
      status: "success",
    } satisfies SignupServerFnResponse;
  });
