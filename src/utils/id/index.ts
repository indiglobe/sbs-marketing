import { uid } from "uid";

/**
 * Generates a numeric-only unique identifier with a fixed length of 8 digits.
 *
 * This function uses the `uid` package as a randomness source and
 * filters out non-numeric characters until the required length is met.
 *
 * ⚠️ Note: This is suitable for non-critical identifiers (e.g., reference codes,
 * display IDs). Do not use as a cryptographic secret.
 *
 * @returns {string} An 8-digit numeric identifier.
 *
 * @example
 * const id = generateNumericId();
 * // => "48392017"
 */
export function generateNumericId(): string {
  let numericId = "";

  while (numericId.length < 10) {
    numericId += uid().replace(/\D/g, ""); // keep digits only
  }

  return numericId.slice(0, 10);
}
