import { cn } from "@/utils/cn";
import { Link } from "@tanstack/react-router";
import { ComponentProps } from "react";

export default function Public({ ...props }: ComponentProps<"main">) {
  return (
    <main
      {...props}
      className={cn(`flex items-center justify-center`, props.className)}
    >
      <section className={cn(``)}>
        <div
          className={cn(
            `bg-background border-brand-200 dark:border-brand-800 w-full max-w-2xl rounded-lg border p-8`,
          )}
        >
          <div className={cn(`flex flex-col gap-6`)}>
            <header className={cn(`flex flex-col gap-2`)}>
              <span className={cn(`text-brand-500 text-sm font-medium`)}>
                Welcome
              </span>

              <h1 className={cn(`text-2xl font-semibold tracking-tight`)}>
                Start building with TanStack
              </h1>

              <div>
                <p className={cn(`text-brand-700 dark:text-brand-300 text-sm`)}>
                  This project uses technologies listed below.
                </p>
                <ul
                  className={cn(
                    `text-brand-400 mt-4 ml-8 flex list-disc flex-wrap gap-x-8 text-sm font-semibold`,
                  )}
                >
                  <li>Tanstack Start</li>
                  <li>Tanstack Router</li>
                  <li>Tanstack Querry</li>
                  <li>Tailwind CSS</li>
                  <li>Better Auth</li>
                  <li>Drizzle ORM</li>
                  <li>Shadcn</li>
                  <li>Zod</li>
                  <li>MySQL</li>
                  <li>Unpic (Image Optimizer)</li>
                  <li>T3 Env (env variable validator)</li>
                  <li>Storybook</li>
                  <li>Vitest</li>
                  <li>Playwright</li>
                </ul>
              </div>
            </header>

            <div className={cn(`flex flex-wrap items-center gap-3`)}>
              <a
                href="https://tanstack.com/"
                target="_blank"
                className={cn(
                  `bg-brand-600 hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-400 focus-visible:ring-brand-500 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors focus-visible:ring-2 focus-visible:outline-none`,
                )}
              >
                Read the docs
              </a>

              <Link
                to="/signin"
                className={cn(
                  `border-brand-200 text-foreground hover:bg-brand-50 dark:border-brand-800 dark:hover:bg-brand-900/30 focus-visible:ring-brand-500 inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none`,
                )}
              >
                View guest route
              </Link>

              <Link
                to="/dashboard"
                className={cn(
                  `border-brand-200 text-foreground hover:bg-brand-50 dark:border-brand-800 dark:hover:bg-brand-900/30 focus-visible:ring-brand-500 inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none`,
                )}
              >
                View protected route
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
