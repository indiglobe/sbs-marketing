import { db } from "@/db";
import { KycTable } from "@/db/schema";
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
        kycOfUserEmail: email,
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
          kycOfUserEmail: email,
        },
      });
  });

export const getKycDetail = createServerFn()
  .inputValidator((d: { email: string }) => d)
  .handler(async ({ data: { email } }) => {
    const kycDetails = (
      await db.select().from(KycTable).where(eq(KycTable.kycOfUserEmail, email))
    )[0];

    if (!kycDetails) return null;

    return kycDetails;
  });

export const getAllKycDetail = createServerFn().handler(async () => {
  const kycDetails = await db.select().from(KycTable);

  return kycDetails;
});
