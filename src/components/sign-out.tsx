import { authClient } from "@/lib/auth/auth-client";
import { cn } from "@/utils/cn";
import { useNavigate } from "@tanstack/react-router";
import { ComponentProps } from "react";

export default function SignOut({ ...props }: ComponentProps<"button">) {
  const navigate = useNavigate();

  return (
    <button
      {...props}
      onClick={async () => {
        await authClient.signOut();
        navigate({ to: "/" });
      }}
      className={cn(
        `text-foreground inline-flex items-center justify-center rounded-md border border-red-200 bg-red-500 px-4 py-2 text-sm font-medium transition-colors hover:bg-red-600 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:outline-none dark:border-red-800 dark:hover:bg-red-900/30`,
        props.className,
      )}
    >
      Sign out
    </button>
  );
}
