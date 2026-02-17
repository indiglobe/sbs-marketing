import { fetchCookieDetails } from "@/integrations/server-function/cookie";
import { referallListTree } from "@/integrations/server-function/referall-tree";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated-routes)/my-team/")({
  component: RouteComponent,

  loader: async () => {
    const cookieValue = await fetchCookieDetails({ data: "user" });

    if (!cookieValue) return;

    const { id } = cookieValue;

    const referallListTreeData = await referallListTree({
      data: { userid: id },
    });

    console.log(referallListTreeData);
  },
});

function RouteComponent() {
  return <div>{}</div>;
}
