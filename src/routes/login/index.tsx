import LoginForm from "@/components/login-form";
import { fetchSession } from "@/utils/auth";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/login/")({
  component: RouteComponent,

  beforeLoad: async () => {
    const isValidUser = await fetchSession();

    if (isValidUser) {
      throw redirect({ to: "/" });
    }
  },
});

function RouteComponent() {
  return <LoginForm />;
}
