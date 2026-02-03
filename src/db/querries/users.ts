import { eq, getTableColumns, sql, InferInsertModel } from "drizzle-orm";
import { db } from "..";
import { UsersTable } from "../schema";

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
export async function getUserById({ userid }: { userid: string }) {
  // Extract all user table columns except `createdAt`
  const { createdAt, ...rest } = getTableColumns(UsersTable);
  // (commonly excluded from public-facing user data)

  // Query the database for the user with the given ID
  const usersFromDB = await db
    .select({
      ...rest,
      // Dynamically generate the user's full name at the SQL level
      fullName: sql<string>`concat(${UsersTable.firstName}, ' ', ${UsersTable.lastName})`,
    })
    .from(UsersTable)
    .where(eq(UsersTable.id, userid));

  // If no user was found, return null
  if (usersFromDB.length === 0) {
    return null;
  }

  // Since `userid` is unique, return the first (and only) result
  return usersFromDB[0];
}

export async function getUserByEmail({ email }: { email: string }) {
  // Extract all user table columns except `createdAt`
  const { createdAt, ...rest } = getTableColumns(UsersTable);
  // (commonly excluded from public-facing user data)

  // Query the database for the user with the given ID
  const usersFromDB = await db
    .select({
      ...rest,
      // Dynamically generate the user's full name at the SQL level
      fullName: sql<string>`concat(${UsersTable.firstName}, ' ', ${UsersTable.lastName})`,
    })
    .from(UsersTable)
    .where(eq(UsersTable.email, email));

  // If no user was found, return null
  if (usersFromDB.length === 0) {
    return null;
  }

  // Since `userid` is unique, return the first (and only) result
  return usersFromDB[0];
}

export type InsertUserParams = Omit<InferInsertModel<typeof UsersTable>, "id">;

export async function insertUser({
  city,
  email,
  firstName,
  lastName,
  mobile,
  password,
  avatarURL,
  createdAt,
  referredBy,
  role,
}: InsertUserParams) {
  try {
    await db.insert(UsersTable).values({
      city,
      email,
      firstName,
      lastName,
      mobile,
      password,
      avatarURL,
      role,
      referredBy,
      createdAt,
      id,
    });
  } catch (error) {}
}
