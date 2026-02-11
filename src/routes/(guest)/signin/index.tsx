import Signin from "@/components/signin";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const signinSearchParams = z.object({
  callbackUrl: z.string().catch(""),
});

export type SigninSearchParams = z.infer<typeof signinSearchParams>;

export const Route = createFileRoute("/(guest)/signin/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Signin />
    </>
  );
}
