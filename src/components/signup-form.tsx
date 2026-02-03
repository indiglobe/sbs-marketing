import { Link } from "@tanstack/react-router";

export default function SignupForm() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-(--color-background) text-(--color-foreground)">
      <div className="w-full max-w-md">
        <div className="rounded-xl border border-black/5 bg-(--color-background) p-6 shadow-lg">
          <h3 className="mb-6 text-center text-2xl font-semibold">Sign Up</h3>

          <form className="space-y-4">
            {/* First Name */}
            <div className="space-y-1">
              <label htmlFor="first-name" className="text-sm font-medium">
                First Name
              </label>
              <input
                type="text"
                id="first-name"
                name="first-name"
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
                name="last-name"
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
                name="confirm-password"
                placeholder="Confirm Password"
                required
                className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-(--color-brand-500) focus:outline-none"
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
