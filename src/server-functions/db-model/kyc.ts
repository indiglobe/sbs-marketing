import { db } from "@/db";
import { getKycDetailsForUser, updateKycDetails } from "@/db/querries/kyc";
import { KYCTable } from "@/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { eq, InferInsertModel } from "drizzle-orm";

export const kycDetailsServerFn = createServerFn()
  .inputValidator(({ userid }: { userid: string }) => {
    return { userid };
  })
  .handler(async ({ data }) => {
    const kycDetails = await getKycDetailsForUser({ userid: data.userid });

    if (!kycDetails) {
      return { detailsOf: data.userid };
    }

    return kycDetails;
  });

export const updateKycDetailsServerFn = createServerFn()
  .inputValidator(
    ({
      userid,
      values,
    }: {
      userid: string;
      values: InferInsertModel<typeof KYCTable>;
    }) => {
      return { userid, values };
    },
  )
  .handler(async ({ data }) => {
    const { userid, values } = data;

    await db
      .insert(KYCTable)
      .values({
        ...values,
        detailsOf: userid,
      })
      .onDuplicateKeyUpdate({
        set: {
          ...values,
        },
      });

    // await db
    //   .update(KYCTable)
    //   .set({ ...values })
    //   .where(eq(KYCTable.detailsOf, userid));
  });

// export const newKycDetailsServerFn = createServerFn()
//   .inputValidator(
//     ({
//       userid,
//       values,
//     }: {
//       userid: string;
//       values: InferInsertModel<typeof KYCTable>;
//     }) => {
//       return { userid, values };
//     },
//   )
//   .handler(async ({ data }) => {
//     const { userid, values } = data;

//     await db
//       .insert(KYCTable)
//       .values({
//         ...values,
//         detailsOf: userid,
//       })
//       .onConflictDoUpdate({
//         target: KYCTable.detailsOf, // must be unique or primary
//         set: {
//           ...values,
//         },
//       });
//   });
