import { fetchSession } from "@/lib/auth/session";
import { WelcomeForm } from "@/ui/welcome-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/welcome/")({
  component: RouteComponent,

  loader: async () => {
    const session = await fetchSession();

    if (!session) throw Error();

    const {
      user: { email, name },
    } = session;

    return {
      email,
      name,
    };
  },
});

function RouteComponent() {
  return (
    <>
      <WelcomeForm />
    </>
  );
}
