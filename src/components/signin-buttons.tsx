import { authClient } from "@/lib/auth/auth-client";
import { ComponentProps } from "react";
import { SigninSearchParams } from "@/routes/(guest)/signin";
import { getRouteApi } from "@tanstack/react-router";
import { cn } from "@/utils/cn";

const signinRoute = getRouteApi("/(guest)/signin/");

export function GoogleSigninButton({ ...props }: ComponentProps<"button">) {
  const signinSearch: SigninSearchParams = signinRoute.useSearch();

  return (
    <button
      onClick={async () => {
        await authClient.signIn.social({
          provider: "google",
          callbackURL: signinSearch.callbackUrl,
        });
      }}
      {...props}
      type="button"
      className={cn(
        `focus-visible:ring-brand-500 focus-visible:ring-offset-background bg-background text-foreground border-foreground/20 flex w-full max-w-60 min-w-full items-center justify-center gap-3 rounded-md border px-4 py-2.5 text-sm font-medium shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2`,
        props.className,
      )}
    >
      <span className={cn(`inline-block size-5`)}>
        <img
          width="48"
          height="48"
          src="https://img.icons8.com/color/48/google-logo.png"
          alt="google-logo"
        />
      </span>

      <span>Sign in with Google</span>
    </button>
  );
}
