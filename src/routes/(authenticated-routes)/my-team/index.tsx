import { fetchCookieDetails } from "@/integrations/server-function/cookie";
import ReferralTree from "@/ui/tree";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated-routes)/my-team/")({
  component: RouteComponent,
  loader: async () => {
    const cookie = await fetchCookieDetails({ data: "user" });

    if (!cookie) return;

    const { id } = cookie;

    return { id };
  },
});

function RouteComponent() {
  return (
    <div>
      <ReferralTree />
    </div>
  );
}
