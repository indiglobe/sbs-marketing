import { Link, useNavigate } from "@tanstack/react-router";
import { ComponentProps, ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/shadcn/dialog";
import { cn } from "@/utils/cn";
import { logoutServerFn } from "@/server-functions/logout";
import toast from "react-hot-toast";
import { LogoutActionPopupMessage } from "./login-popup-message";

export function Navbar() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 font-bold text-white shadow">
              L
            </div>
            <span className="text-lg font-semibold tracking-tight text-gray-900">
              YourLogo
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden items-center md:flex">
            <Link
              to="/"
              className="rounded-full px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 hover:text-gray-900"
            >
              KYC
            </Link>

            <Link
              to="/"
              className="rounded-full px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 hover:text-gray-900"
            >
              Team
            </Link>

            <button className="rounded-full px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 hover:text-gray-900">
              Refer
            </button>

            <LogoutModal logoutButton={<LogoutButton />} />
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none md:hidden"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`transition-all duration-200 ease-out md:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden border-t border-gray-200 bg-white`}
      >
        <div className="space-y-2 px-4 py-4">
          <Link
            to="/"
            className="block rounded-xl px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            KYC
          </Link>

          <Link
            to="/"
            className="block rounded-xl px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Team
          </Link>

          <Link
            to="/"
            className="block rounded-xl px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Refer
          </Link>

          <LogoutModal
            logoutButton={
              <LogoutButton className="block w-full rounded-xl px-4 py-2 text-left text-sm font-medium text-red-600 transition hover:bg-red-50" />
            }
          />
        </div>
      </div>
    </nav>
  );
}

export function LogoutButton({
  className,
  ...props
}: ComponentProps<"button">) {
  return (
    <button
      className={cn(
        "rounded-full px-4 py-2 text-sm font-medium text-red-600 transition-all hover:bg-red-50 hover:text-red-700",
        className,
      )}
      {...props}
    >
      Logout
    </button>
  );
}

export function LogoutModal({ logoutButton }: { logoutButton: ReactNode }) {
  const navigate = useNavigate();

  async function logoutAction() {
    const logoutServerFnRes = await logoutServerFn();

    toast.custom(() => <LogoutActionPopupMessage {...logoutServerFnRes} />);

    navigate({ to: "/" });
  }

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>{logoutButton}</DialogTrigger>
        <DialogContent className="border-red-500 sm:max-w-sm">
          <DialogHeader className="text-left">
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>You are about to logout.</DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <button
              onClick={logoutAction}
              className={cn(
                "ml-auto max-w-max rounded-full px-4 py-2 text-sm font-medium text-red-600 transition-all hover:bg-red-50 hover:text-red-700",
              )}
            >
              Logout
            </button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
