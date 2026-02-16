import { fetchCookieDetails } from "@/integrations/server-function/cookie";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import sbsLogo from "@/assets/sbs.png";
import { cn } from "@/utils/cn";

export const Route = createFileRoute("/(unauthenticated-routes)")({
  component: RouteComponent,

  beforeLoad: async () => {
    const cookieValue = await fetchCookieDetails({ data: "user" });

    if (cookieValue) {
      throw redirect({ to: "/" });
    }
  },
});

function RouteComponent() {
  return (
    <>
      <nav className={cn(`flex w-full items-center justify-center`)}>
        <div className={cn(`z-1 size-20 pt-10`)}>
          <Image src={sbsLogo} alt="sbs-logo" layout="fullWidth" />
        </div>
      </nav>
      <div className={cn(`px-4 pb-20`)}>
        <Outlet />
      </div>
    </>
  );
}
