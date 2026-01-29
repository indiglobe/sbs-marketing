import { defineConfig } from "taskforge-cli/config";

export default defineConfig({
  envDir: "./",
  scripts: {
    "db:generate": { execute: "drizzle-kit generate" },
    "db:migrate": { execute: "drizzle-kit migrate" },
    "db:push": { execute: "drizzle-kit push" },
    "db:pull": { execute: "drizzle-kit pull" },
    "db:setup": { execute: "tsx src/db/helpers/setup-db.ts" },
    "db:studio": { execute: "drizzle-kit studio" },
  },
});
