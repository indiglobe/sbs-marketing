import { db } from "@/db";
import { users } from "@/db/schema";
import { generateToken } from "@/utils/auth/token";
import { verifyPassword } from "@/utils/password";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import z from "zod";
import { setCookie } from "@tanstack/react-start/server";
import { session } from "@/utils/cookies/names";
import { redirect } from "@tanstack/react-router";

export const LoginFormSchema = z.object({
  userid: z.string().min(10).max(10),
  password: z.string().min(8).max(16),
});

export const loginServerFn = createServerFn({ method: "POST" })
  .inputValidator(LoginFormSchema)
  .handler(async ({ data: { password, userid } }) => {
    const user = (await db.select().from(users).where(eq(users.id, userid)))[0];

    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      return;
    }

    const sessionToken = generateToken({ userid });

    setCookie(session, sessionToken, { httpOnly: true, maxAge: 60 * 60 * 24 });

    throw redirect({ to: "/" });
  });
