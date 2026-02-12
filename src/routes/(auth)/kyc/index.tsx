import { KYCForm } from "@/ui/kyc-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/kyc/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <KYCForm />;
}
