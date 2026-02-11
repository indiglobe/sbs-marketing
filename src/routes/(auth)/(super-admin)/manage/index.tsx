import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/(super-admin)/manage/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <main>Hello "/(auth)/(super-admin)/manage"!</main>;
}
