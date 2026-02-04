import { env } from "@/integrations/env";
import bcrypt from "bcrypt";

/**
 * Hashes a plain-text password using bcrypt.
 *
 * This function is asynchronous and returns a bcrypt hash
 * generated with the configured number of salt rounds.
 *
 * @param {string} plainPassword - The raw password to be hashed.
 * @returns {Promise<string>} A promise that resolves to the hashed password.
 *
 * @throws {Error} If bcrypt fails to generate the hash.
 *
 * @example
 * const hashedPassword = await encryptPassword("mySecret123");
 */

export async function encryptPassword(plainPassword: string): Promise<string> {
  const encryptedPassword = await bcrypt.hash(
    plainPassword,
    env.PASSWORD_ENCODING_ROUND,
  );

  return encryptedPassword;
}

/**
 * Compares a plain-text password with a bcrypt-hashed password.
 *
 * This function verifies whether the provided plain password,
 * when hashed, matches the stored bcrypt hash.
 *
 * @param {string} plainPassword - The raw password provided by the user.
 * @param {string} hashedPassword - The previously hashed password to compare against.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the password matches,
 * or `false` if it does not.
 *
 * @throws {Error} If bcrypt fails during the comparison process.
 *
 * @example
 * const isValid = await verifyPassword("mySecret123", user.password);
 * if (!isValid) {
 *   throw new Error("Invalid credentials");
 * }
 */
export async function verifyPassword(
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(plainPassword, hashedPassword);
}
