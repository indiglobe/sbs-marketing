import { SignupFormSchema, signupServerFn } from "@/server-functions/signup";
import { Link, useNavigate } from "@tanstack/react-router";
import { SubmitEvent } from "react";
import { Route } from "@/routes/signup/index";
import { cn } from "@/utils/cn";
import toast from "react-hot-toast";
import { SignupActionPopupMessage } from "./popup-message";

export default function SignupForm() {
  // rename object property to easily use them
  const { "referal-code": referalCode } = Route.useSearch();
  const navigate = useNavigate();

  async function onSubmit(e: SubmitEvent) {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target));

    const { error, data } = SignupFormSchema.safeParse(formData);

    if (error) {
      console.error(error);
      if (
        error._zod.def[0].path[0] === "mobile" &&
        error._zod.def[0].code === "invalid_format"
      ) {
        toast.custom(() => (
          <SignupActionPopupMessage
            status="error"
            // message="Please provide a valid name"
            message={error._zod.output.mobile}
          />
        ));
        return;
      }
      return;
    }

    const signupServerFnRes = await signupServerFn({ data });
    const { status } = signupServerFnRes;

    // toast.custom(() => <LoginActionPopupMessage {...loginServerFnRes} />);

    if (status === "success") {
      navigate({ to: "/" });
    }
  }

  return (
    <div className="bg-background text-foreground flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-background rounded-xl border border-black/5 p-6 shadow-lg">
          <h3 className="mb-6 text-center text-2xl font-semibold">Sign Up</h3>

          <form className="space-y-4" onSubmit={onSubmit}>
            {/* First Name */}
            <div className="space-y-1">
              <label htmlFor="first-name" className="text-sm font-medium">
                First Name
              </label>
              <input
                type="text"
                id="first-name"
                name="firstname"
                placeholder="John"
                required
                className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-(--color-brand-500) focus:outline-none"
              />
            </div>

            {/* Last Name */}
            <div className="space-y-1">
              <label htmlFor="last-name" className="text-sm font-medium">
                Last Name
              </label>
              <input
                type="text"
                id="last-name"
                name="lastname"
                placeholder="Doe"
                required
                className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-(--color-brand-500) focus:outline-none"
              />
            </div>

            {/* City */}
            <div className="space-y-1">
              <label htmlFor="city" className="text-sm font-medium">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Kolkata"
                required
                className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-(--color-brand-500) focus:outline-none"
              />
            </div>

            {/* Mobile */}
            <div className="space-y-1">
              <label htmlFor="mobile" className="text-sm font-medium">
                Mobile
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                placeholder="123-456-7890"
                required
                className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-(--color-brand-500) focus:outline-none"
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="example@email.com"
                required
                className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-(--color-brand-500) focus:outline-none"
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
                placeholder="Password"
                required
                className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-(--color-brand-500) focus:outline-none"
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label htmlFor="confirm-password" className="text-sm font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-(--color-brand-500) focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="referal-code" className="text-sm font-medium">
                Referal code
              </label>
              <input
                type="text"
                id="referal-code"
                name="referalCode"
                className={cn(
                  "w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-(--color-brand-500) focus:outline-none",
                  { "cursor-not-allowed opacity-50": referalCode },
                )}
                defaultValue={referalCode}
                readOnly={!!referalCode}
              />
            </div>

            {/* Submit Button */}
            <div className="mt-4">
              <button
                type="submit"
                className="w-full rounded-md bg-(--color-brand-600) py-2 font-medium text-white transition hover:bg-(--color-brand-700) disabled:pointer-events-none disabled:opacity-60"
              >
                Sign Up
              </button>
            </div>

            {/* Login link */}
            <p className="mt-3 mb-0 text-center text-sm opacity-80">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-(--color-brand-600) hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
