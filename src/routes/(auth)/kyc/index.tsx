import { kycDetailsServerFn } from "@/server-functions/db-model/kyc";
import KycForm from "@/ui/kyc-form";
import { fetchSession } from "@/utils/auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/kyc/")({
  component: RouteComponent,

  loader: async () => {
    const session = await fetchSession();
    const kycDetails = await kycDetailsServerFn({
      data: { userid: session?.userid! },
    });

    return {
      kycDetails,
    };
  },
});

function RouteComponent() {
  return (
    <main>
      <KycForm />
    </main>
  );
}
