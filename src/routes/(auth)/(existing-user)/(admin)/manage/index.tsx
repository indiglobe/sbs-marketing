import { getAllKycDetail } from "@/integrations/server-function/db-querry/kyc";
import { KycTable } from "@/ui/kyc-table";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/(existing-user)/(admin)/manage/")(
  {
    component: RouteComponent,

    loader: async () => {
      const kycDetails = await getAllKycDetail();

      return { kycDetails };
    },
  },
);

function RouteComponent() {
  return (
    <>
      <KycTable />
    </>
  );
}
