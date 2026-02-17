import { db } from "@/db";
import { UserTable } from "@/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";

// Rank Rules (highest first)
const RANKS = [
  { name: "Double Diamond Executive", direct: 10000, team: 36000 },
  { name: "Blue Diamond Executive", direct: 5000, team: 16000 },
  { name: "Diamond Executive", direct: 800, team: 3600 },
  { name: "Gold Executive", direct: 400, team: 800 },
  { name: "Six Silver Executive", direct: 200, team: 400 },
  { name: "Five Star Executive", direct: 90, team: 190 },
  { name: "Three Star Executive", direct: 35, team: 80 },
  { name: "Star Executive", direct: 15, team: 35 },
  { name: "Second Rank", direct: 10, team: 20 },
  { name: "First Rank", direct: 5, team: 10 },
];

async function getTeamCount(userId: string): Promise<number> {
  const directUsers = await db
    .select()
    .from(UserTable)
    .where(eq(UserTable.referredBy, userId));

  let total = directUsers.length;

  for (const user of directUsers) {
    total += await getTeamCount(user.id);
  }

  return total;
}

export const getUserBadge = createServerFn({ method: "GET" })
  .inputValidator((d: { userId: string }) => d)
  .handler(async ({ data }) => {
    const { userId } = data;

    const directUsers = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.referredBy, userId));

    const directCount = directUsers.length;
    const teamCount = await getTeamCount(userId);

    const achievedRank =
      RANKS.find((rank) => directCount >= rank.direct && teamCount >= rank.team)
        ?.name || "No Rank";

    return {
      rank: achievedRank,
      direct: directCount,
      team: teamCount,
    };
  });
