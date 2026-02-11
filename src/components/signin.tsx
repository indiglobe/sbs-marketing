import { cn } from "@/utils/cn";
import { GoogleSigninButton } from "./signin-buttons";
import { ComponentProps } from "react";

export default function Signin({ ...props }: ComponentProps<"main">) {
  return (
    <main
      {...props}
      className={cn(`flex items-center justify-center`, props.className)}
    >
      <section
        className={cn(
          `bg-background text-foreground border-brand-200 dark:border-brand-800 mx-auto flex w-full max-w-md flex-col gap-6 rounded-lg border p-6`,
        )}
      >
        <div className={cn(`flex flex-col gap-2`)}>
          <h2 className={cn(`text-lg font-semibold tracking-tight`)}>
            Hold up for a second
          </h2>

          <p className={cn(`text-brand-700 dark:text-brand-300 text-sm`)}>
            You need to be signed in to continue with this action. It only takes
            a moment.
          </p>
        </div>

        <div className={cn(`flex flex-col gap-4`)}>
          <div className={cn(`flex justify-center`)}>
            <GoogleSigninButton />
          </div>

          <p className={cn(`text-brand-600 dark:text-brand-400 text-xs`)}>
            We'll never post anything without your permission.
          </p>
        </div>
      </section>
    </main>
  );
}
