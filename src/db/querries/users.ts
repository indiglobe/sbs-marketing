import { eq, getTableColumns, sql } from "drizzle-orm";
import { db } from "..";
import { users } from "../schema";

/**
 * Fetches a user by their unique user ID.
 *
 * This function:
 * - Queries the `users` table for a single user
 * - Excludes the `createdAt` column from the result
 * - Computes a `fullName` field by concatenating first and last names
 *
 * @param {Object} params
 * @param {string} params.userid - The unique identifier of the user
 * Returns the user object if found, otherwise `null`
 */
export async function getUser({ userid }: { userid: string }) {
  // Extract all user table columns except `createdAt`
  const { createdAt, ...rest } = getTableColumns(users);
  // (commonly excluded from public-facing user data)

  // Query the database for the user with the given ID
  const usersFromDB = await db
    .select({
      ...rest,
      // Dynamically generate the user's full name at the SQL level
      fullName: sql<string>`concat(${users.firstName}, ' ', ${users.lastName})`,
    })
    .from(users)
    .where(eq(users.id, userid));

  // If no user was found, return null
  if (usersFromDB.length === 0) {
    return null;
  }

  // Since `userid` is unique, return the first (and only) result
  return usersFromDB[0];
}
