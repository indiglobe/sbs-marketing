import { db } from "@/db";
import { UserTable } from "@/db/schema";
import { getNextId } from "@/utils/id";
import { createServerFn } from "@tanstack/react-start";
import { desc, eq, sql } from "drizzle-orm";

export const creteNewUser = createServerFn()
  .inputValidator(
    (d: {
      name: string;
      city: string;
      phone: string;
      password: string;
      referredBy: string | null;
    }) => d,
  )
  .handler(async function createNewUser({ data }) {
    const { name, city, phone, password, referredBy } = data;

    const lastUser = (
      await db.select().from(UserTable).orderBy(desc(UserTable.id)).limit(1)
    )[0];

    const generatedId = getNextId(lastUser?.id);

    await db.insert(UserTable).values({
      id: generatedId,
      name,
      password,
      referredBy,
      city,
      phone,
    });

    return { id: generatedId };
  });

export const getExistingUser = createServerFn()
  .inputValidator((d: { id: string }) => d)
  .handler(async function ({ data }) {
    const { id } = data;

    const user = (
      await db.select().from(UserTable).where(eq(UserTable.id, id)).limit(1)
    )[0];

    if (!user) return null;

    const { id: userId, name, role, city, phone } = user;

    return { id: userId, name, role, city, phone };
  });

export const isValidUser = createServerFn()
  .inputValidator((d: { id: string; password: string }) => d)
  .handler(async function ({ data }) {
    const { id } = data;

    const user = (
      await db.select().from(UserTable).where(eq(UserTable.id, id)).limit(1)
    )[0];

    if (!user) return null;

    const { id: userId, name, role, password, isActive } = user;
    if (password === data.password || isActive) {
      return { id: userId, name, role };
    }

    return null;
  });

export const toggleUserActivation = createServerFn()
  .inputValidator((d: { userid: string; newActivationStatus: boolean }) => d)
  .handler(async ({ data }) => {
    const { userid, newActivationStatus } = data;

    await db
      .update(UserTable)
      .set({ isActive: newActivationStatus })
      .where(eq(UserTable.id, userid));
  });

export const changePassword = createServerFn()
  .inputValidator((d: { userid: string; password: string }) => d)
  .handler(async ({ data }) => {
    const { password, userid } = data;
    await db
      .update(UserTable)
      .set({ password })
      .where(eq(UserTable.id, userid));
  });

export const getDirectJoinerCount = createServerFn()
  .inputValidator((d: { userId: string }) => d)
  .handler(async ({ data }) => {
    const { userId } = data;
    const users = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.referredBy, userId));

    return users.length;
  });
