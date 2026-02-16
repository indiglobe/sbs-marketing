import { db } from "@/db";
import { UserTable } from "@/db/schema";
import { getNextId } from "@/utils/id";
import { createServerFn } from "@tanstack/react-start";
import { desc, eq } from "drizzle-orm";

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

    const { id: userId, name, role } = user;

    return { id: userId, name, role };
  });

export const isValidUser = createServerFn()
  .inputValidator((d: { id: string; password: string }) => d)
  .handler(async function ({ data }) {
    const { id } = data;

    const user = (
      await db.select().from(UserTable).where(eq(UserTable.id, id)).limit(1)
    )[0];

    if (!user) return null;

    const { id: userId, name, role, password } = user;
    if (password === data.password) {
      return { id: userId, name, role };
    }

    return null;
  });
