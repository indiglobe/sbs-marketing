import { db } from "@/db";
import { TeamTable } from "@/db/schema";
import { createServerFn } from "@tanstack/react-start";

createServerFn()
  .inputValidator((d: { id: string }) => d)
  .handler(async ({ data: { id } }) => {
    db.select().from(TeamTable);
  });
