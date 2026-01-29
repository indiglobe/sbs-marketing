import { fetchSession } from "@/utils/auth";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
  beforeLoad: async () => {
    const isValidUser = await fetchSession();

    if (!isValidUser) {
      throw redirect({ to: "/login" });
    }
  },
});

function App() {
  return <></>;
}
