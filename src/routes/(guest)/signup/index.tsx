import SignupForm from "@/ui/signup-form";
import { createFileRoute } from "@tanstack/react-router";

import { z } from "zod";

export const routeSerachSchema = z.object({
  "referal-code": z.string().catch("").optional(),
});

export type RouteSerach = z.infer<typeof routeSerachSchema>;

export const Route = createFileRoute("/(guest)/signup/")({
  component: RouteComponent,

  validateSearch: (search: Record<string, unknown>): RouteSerach =>
    routeSerachSchema.parse(search),
});

function RouteComponent() {
  return <SignupForm />;
}
