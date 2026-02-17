import { db } from "@/db";
import { createServerFn } from "@tanstack/react-start";
import { sql } from "drizzle-orm";

export const referallListTree = createServerFn()
  .inputValidator((d: { userid: string }) => d)
  .handler(async ({ data: { userid } }) => {
    const tenLevelTree = await db.execute(sql`
      WITH RECURSIVE referral_tree AS (
        -- Level 1 (Direct)
        SELECT 
        id,
        referred_by,
        1 AS level
        FROM users
        WHERE referred_by = ${userid}
        
        UNION ALL

        -- Next Levels
        SELECT 
        u.id,
        u.referred_by,
        rt.level + 1
        FROM users u
        INNER JOIN referral_tree rt 
        ON u.referred_by = rt.id
        WHERE rt.level < 10
        )
        SELECT * FROM referral_tree;
        `);

    return tenLevelTree;
  });
