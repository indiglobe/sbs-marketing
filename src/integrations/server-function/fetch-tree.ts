import { db } from "@/db";
import { UserTable } from "@/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { eq, inArray } from "drizzle-orm";

type TreeUser = {
  id: string;
  name: string;
  referredBy: string | null;
};

export const treeDataForUsers = createServerFn()
  .inputValidator((userId: string) => userId)
  .handler(async ({ data: userId }): Promise<TreeUser[]> => {
    const result: TreeUser[] = [];

    // 1️⃣ Get root user
    const rootUser = await db
      .select({
        id: UserTable.id,
        name: UserTable.name,
        referredBy: UserTable.referredBy,
      })
      .from(UserTable)
      .where(eq(UserTable.id, userId));

    if (!rootUser.length) return [];

    result.push({
      ...rootUser[0],
      referredBy: null,
    });

    // 2️⃣ Recursively fetch children
    let currentLevelIds = [userId];

    while (currentLevelIds.length > 0) {
      const children = await db
        .select({
          id: UserTable.id,
          name: UserTable.name,
          referredBy: UserTable.referredBy,
        })
        .from(UserTable)
        .where(inArray(UserTable.referredBy, currentLevelIds));

      if (children.length === 0) break;

      result.push(...children);

      // Prepare next level
      currentLevelIds = children.map((u) => u.id);
    }

    return result;
  });
