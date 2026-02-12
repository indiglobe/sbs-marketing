import { WelcomeForm } from "@/ui/welcome-form";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/(new-user)/welcome/")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (context.userDetails) {
      throw redirect({ to: "/" });
    }
  },
});

function RouteComponent() {
  return (
    <>
      <WelcomeForm />
    </>
  );
}
