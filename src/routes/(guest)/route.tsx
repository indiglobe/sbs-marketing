import { fetchSession } from "@/utils/auth";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(guest)")({
  component: RouteComponent,

  beforeLoad: async () => {
    const isValidUser = await fetchSession();

    if (isValidUser) {
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
