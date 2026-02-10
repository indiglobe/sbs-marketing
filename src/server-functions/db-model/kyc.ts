import { getKycDetailsForUser } from "@/db/querries/kyc";
import { createServerFn } from "@tanstack/react-start";

export const kycDetailsServerFn = createServerFn()
  .inputValidator(({ userid }: { userid: string }) => {
    return { userid };
  })
  .handler(async ({ data }) => {
    const kycDetails = await getKycDetailsForUser({ userid: data.userid });

    return kycDetails;
  });
