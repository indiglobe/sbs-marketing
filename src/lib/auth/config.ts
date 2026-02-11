import { betterAuth } from "better-auth";
import { env } from "../env";

export const auth = betterAuth({
  //...
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 7 * 24 * 60 * 60, // 7 days cache duration
      strategy: "jwe", // can be "jwt" or "compact"
      refreshCache: true, // Enable stateless refresh
    },
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },

  // user: {
  //   additionalFields: {
  //     username: {
  //       type: "string",
  //       required: true,
  //     },
  //     role: {
  //       type: "string",
  //       defaultValue: "user",
  //     },
  //     preferences: {
  //       type: "json",
  //       defaultValue: {},
  //     },
  //   },
  // },
});
