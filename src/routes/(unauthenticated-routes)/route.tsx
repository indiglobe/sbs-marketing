import { fetchCookieDetails } from "@/integrations/server-function/cookie";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(unauthenticated-routes)")({
  component: RouteComponent,

  beforeLoad: async () => {
    const cookieValue = await fetchCookieDetails({ data: "user" });

    if (cookieValue) {
      throw redirect({ to: "/" });
    }
  },
});

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
