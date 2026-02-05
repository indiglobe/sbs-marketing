import { LoginFormSchema, loginServerFn } from "@/server-functions/login";
import { Link, useNavigate } from "@tanstack/react-router";
import { SubmitEvent } from "react";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";
import { LoginActionPopupMessage } from "./popup-message";

export default function LoginForm() {
  const navigate = useNavigate();

  async function onSubmit(e: SubmitEvent) {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target));
    const { error, data } = LoginFormSchema.safeParse(formData);

    if (error) {
      if (
        error._zod.def[0].path[0] === "userid" &&
        error._zod.def[0].code === "invalid_format"
      ) {
        toast.custom(() => (
          <LoginActionPopupMessage
            status="error"
            message="Please provide valid id format"
          />
        ));
        return;
      }
      if (
        error._zod.def[0].path[0] === "password" &&
        (error._zod.def[0].code === "too_big" ||
          error._zod.def[0].code === "too_small")
      ) {
        toast.custom(() => (
          <LoginActionPopupMessage
            status="error"
            message="Password should be within 8 to 16 character"
          />
        ));
        return;
      }
      return;
    }

    const loginServerFnRes = await loginServerFn({ data });
    const { status, errorMessage } = loginServerFnRes;

    console.log(status);

    if (status === "success") {
      toast.custom(() => (
        <LoginActionPopupMessage
          status="success"
          message="You have successfuly logged in"
        />
      ));
    }

    if (status === "error") {
      toast.custom(() => (
        <LoginActionPopupMessage status="error" message={errorMessage} />
      ));
    }

    if (status === "success") {
      navigate({ to: "/" });
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-background rounded-xl border border-black/5 p-6 shadow-lg dark:border-white/10">
          <h3 className="mb-6 text-center text-2xl font-semibold">Login</h3>

          <form onSubmit={onSubmit} className="space-y-4">
            {/* User ID */}
            <div className="space-y-1">
              <label htmlFor="userId" className="text-sm font-medium">
                User ID
              </label>
              <input
                type="text"
                id="userId"
                name="userid"
                placeholder="Enter your User ID"
                required
                className="focus:ring-brand-500 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm focus:ring-2 focus:outline-none dark:border-white/15 dark:bg-black/20"
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
                className="focus:ring-brand-500 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm focus:ring-2 focus:outline-none dark:border-white/15 dark:bg-black/20"
              />
            </div>

            {/* Submit */}
            <Submit />

            {/* Links */}
            <div className="text-center text-sm opacity-80">
              <p className="mt-3 mb-0 text-center text-sm opacity-80">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-(--color-brand-600) hover:underline"
                >
                  Sign Up
                </Link>
              </p>
              {/* |{" "}
              <Link
                to="/signup"
                className="text-brand-600 hover:text-brand-700 transition"
              >
                Sign Up
              </Link> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function Submit() {
  const status = useFormStatus();

  return (
    <button
      type="submit"
      disabled={status.pending}
      className="bg-brand-600 hover:bg-brand-700 w-full rounded-md py-2 font-medium text-white transition disabled:pointer-events-none disabled:opacity-60"
    >
      {status.pending ? "Logging..." : "Login"}
    </button>
  );
}
