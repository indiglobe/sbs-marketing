import { cn } from "@/utils/cn";
import { Link } from "@tanstack/react-router";

export function RootNotFound() {
  return (
    <section
      className={cn(
        `bg-background text-foreground flex min-h-screen items-center justify-center px-6`,
      )}
    >
      <div
        className={cn(
          `bg-background border-brand-200 dark:border-brand-800 w-full max-w-md rounded-lg border p-6`,
        )}
      >
        <div className={cn(`flex flex-col gap-4`)}>
          <div className={cn(`flex items-center gap-2`)}>
            <span className={cn(`text-brand-500 text-sm font-medium`)}>
              404
            </span>
            <h1 className={cn(`text-lg font-semibold`)}>Page not found ⚠️</h1>
          </div>

          <p className={cn(`text-brand-700 dark:text-brand-300 text-sm`)}>
            The page you're looking for doesn't exist or may have been moved.
          </p>

          <div className={cn(`pt-2`)}>
            <Link
              to="/"
              className={cn(
                `bg-brand-600 hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-400 focus-visible:ring-brand-500 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors focus-visible:ring-2 focus-visible:outline-none`,
              )}
            >
              Go home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
