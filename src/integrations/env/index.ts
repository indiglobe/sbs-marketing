import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string(),
    PASSWORD_ENCODING_ROUND: z.string().transform((val) => {
      const n = Number(val);
      if (isNaN(n)) throw new Error("PASSWORD_ENCODING_ROUND must be a number");
      return n;
    }),
    TOKEN_SECRET: z.string(),
  },

  /**
   * The prefix that client-side variables must have. This is enforced both at
   * a type-level and at runtime.
   */
  clientPrefix: "VITE_",

  client: {
    // VITE_APP_TITLE: z.string().min(1),
  },

  /**
   * What object holds the environment variables at runtime. This is usually
   * `process.env` or `import.meta.env`.
   */
  runtimeEnv: runtimeEnv(),

  /**
   * By default, this library will feed the environment variables directly to
   * the Zod validator.
   *
   * This means that if you have an empty string for a value that is supposed
   * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
   * it as a type mismatch violation. Additionally, if you have an empty string
   * for a value that is supposed to be a string with a default value (e.g.
   * `DOMAIN=` in an ".env" file), the default value will never be applied.
   *
   * In order to solve these issues, we recommend that all new projects
   * explicitly specify this option as true.
   */
  emptyStringAsUndefined: true,
});

/**
 * Normalize runtime env so it works in:
 * - Vite (import.meta.env)
 * - Node.js (process.env)
 */
function runtimeEnv() {
  if (typeof process !== "undefined") {
    return process.env;
  } else if (typeof import.meta !== "undefined") {
    return import.meta.env;
  } else {
    return {};
  }
}
