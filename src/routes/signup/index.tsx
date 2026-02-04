import SignupForm from "@/components/signup-form";
import { fetchSession } from "@/utils/auth";
import { createFileRoute, redirect } from "@tanstack/react-router";

import { z } from "zod";

const routeSerachSchema = z.object({
  "referal-code": z.string().catch("").optional(),
});

type RouteSerach = z.infer<typeof routeSerachSchema>;

export const Route = createFileRoute("/signup/")({
  component: RouteComponent,

  validateSearch: (search: Record<string, unknown>): RouteSerach =>
    routeSerachSchema.parse(search),

  beforeLoad: async () => {
    const isValidUser = await fetchSession();

    if (isValidUser) {
      throw redirect({ to: "/" });
    }
  },
});

function RouteComponent() {
  return <SignupForm />;
}
