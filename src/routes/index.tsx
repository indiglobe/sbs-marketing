import { Navbar } from "@/components/navbar";
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
  loader: async () => {
    const session = await fetchSession();

    if (!session) {
      return { userid: null };
    }

    return {
      userid: session.userid,
    };
  },
});

function App() {
  return (
    <main>
      <Navbar />
    </main>
  );
}
