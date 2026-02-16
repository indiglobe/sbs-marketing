import ReferralTree from "@/ui/tree";
import { cn } from "@/utils/cn";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated-routes)/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={cn(`container m-auto`)}>
      <ReferralTree />
    </div>
  );
}
