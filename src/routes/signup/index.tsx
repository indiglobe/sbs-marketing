import SignupForm from "@/components/signup-form";
import { fetchSession } from "@/utils/auth";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/signup/")({
  component: RouteComponent,

  beforeLoad: async () => {
    const isValidUser = await fetchSession();

    if (isValidUser) {
      throw redirect({ to: "/" });
    }
  },
});

function RouteComponent() {
  return <SignupForm />;
}
