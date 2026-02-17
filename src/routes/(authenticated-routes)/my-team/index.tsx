import ReferralTree from "@/ui/tree";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated-routes)/my-team/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <ReferralTree />
    </div>
  );
}
