import { cn } from "@/utils/cn";
import { useRouter } from "@tanstack/react-router";

export function RootError({ error }: { error: unknown }) {
  const router = useRouter();

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
            <h1 className={cn(`text-lg font-semibold`)}>
              Something went wrong 💥
            </h1>
          </div>

          <p className={cn(`text-brand-700 dark:text-brand-300 text-sm`)}>
            An unexpected error occurred. You can try again or reload the page.
          </p>

          <div className={cn(`flex items-center gap-3 pt-2`)}>
            <button
              onClick={() => router.navigate({ to: "/" })}
              className={cn(
                `bg-brand-600 hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-400 focus-visible:ring-brand-500 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors focus-visible:ring-2 focus-visible:outline-none`,
              )}
            >
              Try again
            </button>

            <button
              onClick={() => window.location.reload()}
              className={cn(
                `border-brand-200 text-foreground hover:bg-brand-50 dark:border-brand-800 dark:hover:bg-brand-900/30 focus-visible:ring-brand-500 inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none`,
              )}
            >
              Reload
            </button>
          </div>

          <div>
            {error instanceof Error && (
              <details className={cn(`mt-6 text-left text-xs text-gray-500`)}>
                <summary className={`cursor-pointer font-medium`}>
                  Error details
                </summary>
                <pre className={cn(`mt-2 whitespace-pre-wrap`)}>
                  {error.message}
                </pre>
              </details>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
