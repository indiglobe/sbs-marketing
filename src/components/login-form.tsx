import { LoginFormSchema, loginServerFn } from "@/server-functions/login";
import { cn } from "@/utils/cn";
import { SubmitEvent } from "react";
import { useFormStatus } from "react-dom";

export default function LoginForm() {
  async function onSubmit(e: SubmitEvent) {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target));

    const { error, data } = LoginFormSchema.safeParse(formData);

    if (error) {
      console.log(error);

      // TODO: show error message if there is any error while validating

      return;
    }

    await loginServerFn({ data });
  }

  return (
    <div
      className={cn(
        `bg-background flex min-h-screen items-center justify-center`,
      )}
    >
      <form
        className={cn(
          `text-background font-brand-secondary bg-brand-200 dark:bg-brand-950 border-brand-600 flex w-full max-w-sm flex-col gap-6 rounded-lg border p-8 shadow-lg`,
        )}
        onSubmit={onSubmit}
      >
        <h2
          className={cn(
            `text-brand-600 dark:text-brand-50 text-center text-2xl font-bold`,
          )}
        >
          Login
        </h2>

        {/* User ID */}
        <div
          className={cn(
            `text-brand-600 dark:text-brand-50 flex flex-col gap-2`,
          )}
        >
          <label htmlFor="userid" className={cn(`font-semibold`)}>
            User ID
          </label>
          <input
            type="text"
            id="userid"
            name="userid"
            placeholder="Enter your user ID"
            className={cn(
              `bg-background text-foreground border-brand-400 rounded-md border px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none`,
            )}
          />
        </div>

        {/* Password */}
        <div className={cn(`flex flex-col gap-2`)}>
          <label
            htmlFor="password"
            className={cn(`text-brand-600 dark:text-brand-50 font-semibold`)}
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className={cn(
              `bg-background text-foreground border-brand-400 rounded-md border px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none`,
            )}
          />
        </div>

        <Submit />
      </form>
    </div>
  );
}

function Submit() {
  const status = useFormStatus();
  return (
    <button
      disabled={status.pending}
      type="submit"
      className={cn(
        `rounded-md bg-orange-500 py-2 font-semibold text-white transition-colors duration-300 hover:bg-orange-600`,
      )}
    >
      {status.pending ? "Logging..." : "Login"}
    </button>
  );
}
