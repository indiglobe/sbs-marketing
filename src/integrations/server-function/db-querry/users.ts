import { db } from "@/db";
import { UserTable } from "@/db/schema";
import { fetchSession } from "@/lib/auth/session";
import { WelcomeFormSchema } from "@/ui/welcome-form";
import { createServerFn } from "@tanstack/react-start";
import { desc, eq } from "drizzle-orm";
import { getNextId } from "@/utils/id";

export const getUserDetails = createServerFn()
  .inputValidator((data: { email: string }) => data)
  .handler(async ({ data: { email } }) => {
    const user = (
      await db.select().from(UserTable).where(eq(UserTable.email, email))
    )[0];

    if (!user) return null;

    return user;
  });

export const insertUserDetails = createServerFn()
  .inputValidator((data: WelcomeFormSchema) => data)
  .handler(async ({ data }) => {
    const { city, email, name, phone, referrer } = data;
    const session = await fetchSession();

    if (!session) throw new Error();

    const {
      user: { image },
    } = session;

    const lastUserId = await getLastUserId();

    const nextId = getNextId(lastUserId ? lastUserId : undefined);

    await db.insert(UserTable).values({
      name,
      email,
      phone,
      city,
      avatarUrl: image,
      id: nextId,
      referredBy: referrer,
    });
  });

export const getLastUserId = createServerFn().handler(async () => {
  const userDetails = (
    await db
      .select({ id: UserTable.id })
      .from(UserTable)
      .limit(1)
      .orderBy(desc(UserTable.id))
  )[0];

  if (!userDetails) return null;

  return userDetails.id;
});
