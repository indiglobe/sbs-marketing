import { getUserBadge } from "@/integrations/server-function/badge";
import { fetchCookieDetails } from "@/integrations/server-function/cookie";
import { getDirectJoinerCount } from "@/integrations/server-function/querry/users";
import UserBadge from "@/ui/badge";
import { cn } from "@/utils/cn";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { ComponentProps } from "react";

export const Route = createFileRoute("/(authenticated-routes)/")({
  component: RouteComponent,

  loader: async () => {
    const cookieValue = await fetchCookieDetails({ data: "user" });
    if (!cookieValue) return;

    const { id } = cookieValue;
    const directJoinerCount = await getDirectJoinerCount({
      data: { userId: id },
    });

    const userbadgeDetails = await getUserBadge({ data: { userId: id } });

    return { directJoinerCount, userbadgeDetails };
  },
});

function RouteComponent() {
  return (
    <div className={cn(`container m-auto`)}>
      <Welcome />
    </div>
  );
}

function Welcome({ ...props }: ComponentProps<"div">) {
  const loaderData = useLoaderData({ from: "/(authenticated-routes)" });
  const pageLoaderData = useLoaderData({ from: "/(authenticated-routes)/" });

  if (!loaderData) return null;
  if (!pageLoaderData) return null;

  return (
    <div
      {...props}
      className={cn(`text-center text-2xl font-semibold`, props.className)}
    >
      <div className={cn(`pb-4`)}>Welcome to SBS Marketing</div>

      <div className={cn(`flex w-full items-center justify-center`)}>
        <div>
          <span>Hello: </span>
          <span className={cn(`font-bold`)}>{loaderData.name}</span>
        </div>
      </div>

      <div className={cn(`mt-6 flex items-center justify-center`)}>
        <UserBadge userId={loaderData.id} />
      </div>

      <div className={cn(`mt-6 flex items-center justify-center`)}>
        <div className="w-full max-w-sm rounded-2xl border bg-white p-6 shadow-md">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            User Network Stats
          </h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-gray-100 p-3">
              <span className="font-medium text-gray-600">Direct Joiner</span>
              <span className="text-lg font-bold text-indigo-600">
                {pageLoaderData.userbadgeDetails.direct}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-gray-100 p-3">
              <span className="font-medium text-gray-600">
                Joined by referal
              </span>
              <span className="text-lg font-bold text-purple-600">
                {pageLoaderData.userbadgeDetails.team -
                  pageLoaderData.userbadgeDetails.direct}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-gray-100 p-3">
              <span className="font-medium text-gray-600">Team Member</span>
              <span className="text-lg font-bold text-purple-600">
                {pageLoaderData.userbadgeDetails.team}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
