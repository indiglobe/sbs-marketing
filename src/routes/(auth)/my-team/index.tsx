import Header from "@/components/header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/my-team/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      {/* <Header /> */}
      Hello "/(auth)/my-team"!
    </main>
  );
}
