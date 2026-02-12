import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/(existing-user)/(admin)")({
  component: RouteComponent,

  beforeLoad: async ({ context }) => {
    const { userDetails } = context;

    if (userDetails.role !== "admin") {
      throw redirect({ to: "/dashboard" });
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
