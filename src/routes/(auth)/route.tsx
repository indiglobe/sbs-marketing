import Header from "@/components/header";
import { fetchSession } from "@/utils/auth";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)")({
  component: RouteComponent,

  beforeLoad: async () => {
    const session = await fetchSession();

    if (!session) {
      throw redirect({ to: "/login" });
    }
  },

  loader: async () => {
    const session = await fetchSession();

    return {
      userName: session?.fullName,
      userid: session?.userid,
    };
  },
});

function RouteComponent() {
  const { userid } = Route.useLoaderData();

  return (
    <>
      <Header userid={userid!} />
      <Outlet />
    </>
  );
}
