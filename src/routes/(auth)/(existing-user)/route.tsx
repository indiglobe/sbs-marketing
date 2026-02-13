import { BeforeLoadRouterContext } from "@/router";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/(existing-user)")({
  component: RouteComponent,

  search: {},

  beforeLoad: async ({ context }) => {
    const { userDetails } = context;
    if (!userDetails) {
      throw redirect({ to: "/welcome" });
    }

    return { userDetails } satisfies BeforeLoadRouterContext;
  },
});

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
