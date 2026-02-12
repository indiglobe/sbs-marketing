import { db } from "@/db";
import { UserTable } from "@/db/schema";
import { fetchSession } from "@/lib/auth/session";
import { WelcomeFormSchema } from "@/ui/welcome-form";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";

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
    const { city, email, name, phone } = data;
    const session = await fetchSession();

    if (!session) throw new Error();

    const {
      user: { image },
    } = session;

    await db
      .insert(UserTable)
      .values({ name, email, phone, city, avatarUrl: image });
  });
