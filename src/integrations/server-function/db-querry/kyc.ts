import { db } from "@/db";
import { KycTable, UserTable } from "@/db/schema";
import { KycFormSchema } from "@/ui/kyc-form";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";

export const upsertKycDetails = createServerFn()
  .inputValidator((d: { email: string; kycDetails: KycFormSchema }) => d)
  .handler(async ({ data: { email, kycDetails } }) => {
    const {
      aadhar,
      accountHolderName,
      bankAccount,
      bankName,
      branchName,
      ifsc,
      pan,
    } = kycDetails;

    const { id } = (
      await db.select().from(UserTable).where(eq(UserTable.email, email))
    )[0];

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
        kycForUserId: id,
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
          kycForUserId: id,
        },
      });
  });

export const getKycDetail = createServerFn()
  .inputValidator((d: { email: string }) => d)
  .handler(async ({ data: { email } }) => {
    const userDetails = (
      await db.select().from(UserTable).where(eq(UserTable.email, email))
    )[0];

    if (!userDetails) return null;

    const { id } = userDetails;

    const kycDetails = (
      await db.select().from(KycTable).where(eq(KycTable.kycForUserId, id))
    )[0];

    return kycDetails;
  });

export const getAllKycDetail = createServerFn().handler(async () => {
  const kycDetails = await db.select().from(KycTable);

  return kycDetails;
});
