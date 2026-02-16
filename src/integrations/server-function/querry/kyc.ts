import { db } from "@/db";
import { KycTable } from "@/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { fetchCookieDetails } from "../cookie";
import { eq } from "drizzle-orm";

export const upsertKycDetails = createServerFn()
  .inputValidator(
    (d: {
      aadhar: string;
      accountHolderName: string;
      bankAccount: string;
      bankName: string;
      branchName: string;
      ifsc: string;
      pan: string;
    }) => d,
  )
  .handler(async ({ data }) => {
    const {
      aadhar,
      accountHolderName,
      bankAccount,
      bankName,
      branchName,
      ifsc,
      pan,
    } = data;

    const cookieValue = await fetchCookieDetails({ data: "user" });

    if (!cookieValue) return;

    const { id } = cookieValue;

    await db
      .insert(KycTable)
      .values({
        aadhar,
        accountHolderName,
        bankAccount,
        bankName,
        branchName,
        ifsc,
        pan,
        kycOfUserId: id,
      })
      .onDuplicateKeyUpdate({
        set: {
          aadhar,
          accountHolderName,
          bankAccount,
          bankName,
          branchName,
          ifsc,
          pan,
        },
      });
  });

export const allKycDetails = createServerFn().handler(async () => {
  const kycDetails = await db.select().from(KycTable);

  return kycDetails;
});

export const kycDetails = createServerFn()
  .inputValidator((d: { id: string }) => d)
  .handler(async ({ data: { id } }) => {
    const kycDetails = (
      await db.select().from(KycTable).where(eq(KycTable.kycOfUserId, id))
    )[0];

    if (!kycDetails) return null;

    return kycDetails;
  });
