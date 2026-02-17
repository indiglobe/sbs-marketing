import { db } from "@/db";
import { UsersInTeamsTable } from "@/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { eq, InferInsertModel } from "drizzle-orm";

export const addMemberIntoTeam = createServerFn()
  .inputValidator((d: { teamId: number; memberId: string }) => d)
  .handler(async ({ data }) => {
    const { memberId, teamId } = data;

    await db.insert(UsersInTeamsTable).values({ teamId, userId: memberId });
  });

export const addMemberIntoAllTeams = createServerFn()
  .inputValidator((d: { userId: string; teamsId: number[] }) => d)
  .handler(async ({ data }) => {
    const { teamsId, userId } = data;
    type Values = InferInsertModel<typeof UsersInTeamsTable>;

    const values = teamsId.map<Values>((teamid) => {
      return { teamId: teamid, userId };
    });

    await db.insert(UsersInTeamsTable).values(values);
  });

export const getAllTeamsForUserWithId = createServerFn()
  .inputValidator((d: { userid: string }) => d)
  .handler(async ({ data }) => {
    const { userid } = data;

    const teamIds = await db
      .select({ teamId: UsersInTeamsTable.teamId })
      .from(UsersInTeamsTable)
      .where(eq(UsersInTeamsTable.userId, userid));

    return teamIds;
  });
