import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/manage/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(auth)/manage/"!</div>;
}
