import { getKycDetail } from "@/integrations/server-function/db-querry/kyc";
import { KYCForm } from "@/ui/kyc-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/(existing-user)/kyc/")({
  component: RouteComponent,

  loader: async ({ context }) => {
    const { userDetails } = context;
    const { email } = userDetails;

    const kycDetails = await getKycDetail({ data: { email } });

    return { kycDetails };
  },
});

function RouteComponent() {
  return <KYCForm />;
}
