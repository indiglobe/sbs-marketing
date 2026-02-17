import { cn } from "@/utils/cn";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { ComponentProps } from "react";

export const Route = createFileRoute("/(authenticated-routes)/")({
  component: RouteComponent,
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

  if (!loaderData) return null;

  return (
    <div
      {...props}
      className={cn(`text-center text-2xl font-semibold`, props.className)}
    >
      <div className={cn(`pb-4`)}>Welcome to SBS Marketing</div>
      <div>
        <span>Hello: </span>
        <span className={cn(`font-bold`)}>{loaderData.name}</span>
      </div>
    </div>
  );
}
