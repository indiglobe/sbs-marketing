import { cn } from "@/utils/cn";
import { Link } from "@tanstack/react-router";
import { ComponentProps } from "react";
import SignOut from "./sign-out";

export default function Dashboard({ ...props }: ComponentProps<"main">) {
  return (
    <main
      {...props}
      className={cn(`flex items-center justify-center`, props.className)}
    >
      <section
        className={cn(
          `bg-background text-foreground flex min-h-screen items-center justify-center px-6`,
        )}
      >
        <div
          className={cn(
            `bg-background border-brand-200 dark:border-brand-800 w-full max-w-3xl rounded-lg border p-8`,
          )}
        >
          <div className={cn(`flex flex-col gap-6`)}>
            <header className={cn(`flex flex-col gap-2`)}>
              <span className={cn(`text-brand-500 text-sm font-medium`)}>
                Dashboard
              </span>

              <h1 className={cn(`text-2xl font-semibold tracking-tight`)}>
                Your workspace
              </h1>

              <p className={cn(`text-brand-700 dark:text-brand-300 text-sm`)}>
                This is a protected-style area where application features would
                normally live.
              </p>
            </header>

            <nav className={cn(`flex flex-wrap items-center gap-3`)}>
              <Link
                to="/"
                className={cn(
                  `bg-brand-600 hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-400 focus-visible:ring-brand-500 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors focus-visible:ring-2 focus-visible:outline-none`,
                )}
              >
                Go to home
              </Link>

              <Link
                to="/signin"
                className={cn(
                  `border-brand-200 text-foreground hover:bg-brand-50 dark:border-brand-800 dark:hover:bg-brand-900/30 focus-visible:ring-brand-500 inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none`,
                )}
              >
                Go to guest route
              </Link>

              <SignOut />
            </nav>
          </div>
        </div>
      </section>
    </main>
  );
}
