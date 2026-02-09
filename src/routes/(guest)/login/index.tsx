import LoginForm from "@/ui/login-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(guest)/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <LoginForm />;
}
