import { env } from "@/integrations/env";
import jwt from "jsonwebtoken";

export type Session = {
  userid: string;
};

/**
 * Generates a signed JSON Web Token (JWT) for a given payload.
 *
 * @param {Session} payload - The data to encode in the token (e.g., user info).
 * @param {object} [options] - Optional JWT signing options (e.g., expiresIn, issuer).
 * @returns {string} A signed JWT string.
 *
 * @throws {Error} If signing fails.
 *
 * @example
 * const token = generateToken({ userId: 123 }, process.env.JWT_SECRET!, { expiresIn: '1h' });
 * // => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 */
export function generateToken(
  payload: Session,
  options?: jwt.SignOptions,
): string {
  return jwt.sign(payload, env.TOKEN_SECRET, options);
}

/**
 * Verifies and decodes a JSON Web Token (JWT).
 *
 * This function checks the token's signature against the provided secret
 * and returns the decoded payload if valid. Throws an error if the token
 * is invalid, expired, or tampered with.
 *
 * @param {string} token - The JWT string to verify.
 * @param {object} [options] - Optional verification options (e.g., issuer, audience).
 * @returns {Session} The decoded token payload.
 *
 * @throws {jwt.JsonWebTokenError | jwt.TokenExpiredError} If verification fails.
 *
 * @example
 * const payload = verifyToken(token, process.env.JWT_SECRET!);
 * console.log(payload.userId); // 42
 */
export function verifyToken(
  token: string,
  options?: jwt.VerifyOptions,
): Session {
  return jwt.verify(token, env.TOKEN_SECRET, options) as Session;
}
