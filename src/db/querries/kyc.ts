import { eq, InferInsertModel } from "drizzle-orm";
import { db } from "..";
import { KYCTable } from "../schema";

export async function getKycDetailsForUser({ userid }: { userid: string }) {
  const data = (
    await db
      .select()
      .from(KYCTable)
      .where(eq(KYCTable.detailsOf, userid))
      .limit(1)
  )[0];

  return data;
}

export async function updateKycDetails({
  userid,
  data,
}: {
  userid: string;
  data: Partial<InferInsertModel<typeof KYCTable>>;
}) {
  await db
    .update(KYCTable)
    .set({ ...data })
    .where(eq(KYCTable.detailsOf, userid));
}
