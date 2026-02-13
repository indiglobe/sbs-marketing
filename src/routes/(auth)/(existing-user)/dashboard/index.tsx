import { checkUserMiddleware } from "@/middleware/check-user";
import ReferralTree from "@/ui/tree";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/(existing-user)/dashboard/")({
  component: RouteComponent,

  beforeLoad: async ({ context }) => {
    if (!context.userDetails) {
      throw redirect({ to: "/welcome" });
    }
  },

  server: {
    middleware: [checkUserMiddleware],
  },
});

function RouteComponent() {
  return (
    <>
      <ReferralTree />
    </>
  );
}
