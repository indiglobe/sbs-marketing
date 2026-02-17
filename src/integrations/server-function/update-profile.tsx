import { db } from "@/db";
import { UserTable, KycTable } from "@/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { fetchCookieDetails } from "./cookie";

export const updateProfileDetails = createServerFn()
  .inputValidator(
    (d: {
      aadhar: string;
      accountHolderName: string;
      bankAccount: string;
      bankName: string;
      branchName: string;
      city: string;
      ifsc: string;
      mobile: string;
      name: string;
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
      city,
      ifsc,
      mobile,
      name,
      pan,
    } = data;

    const cookieValue = await fetchCookieDetails({ data: "user" });

    if (!cookieValue) return;

    const { id } = cookieValue;

    await db
      .update(UserTable)
      .set({ city, name, phone: mobile })
      .where(eq(UserTable.id, id));

    await db
      .update(KycTable)
      .set({
        aadhar,
        accountHolderName,
        bankAccount,
        branchName,
        bankName,
        ifsc,
        pan,
      })
      .where(eq(KycTable.kycOfUserId, id));
  });
