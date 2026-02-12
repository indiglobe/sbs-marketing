import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)")({
  component: RouteComponent,

  beforeLoad: async () => {
    throw redirect({ to: "/dashboard" });
  },
});

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
