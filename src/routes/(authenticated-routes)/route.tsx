import { fetchCookieDetails } from "@/integrations/server-function/cookie";
import { getExistingUser } from "@/integrations/server-function/querry/users";
import { signout } from "@/integrations/server-function/sign-out";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/shadcn/avatar";
import { Button } from "@/ui/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/shadcn/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/shadcn/popover";
import { Sheet, SheetContent, SheetTrigger } from "@/ui/shadcn/sheet";
import { cn } from "@/utils/cn";
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
} from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { Menu } from "lucide-react";
import { useState } from "react";
import sbsMarketing from "@/assets/sbs.png";

export const Route = createFileRoute("/(authenticated-routes)")({
  component: RouteComponent,

  beforeLoad: async () => {
    const userDetails = await fetchCookieDetails({ data: "user" });

    if (!userDetails) {
      throw redirect({ to: "/login" });
    }
  },

  loader: async () => {
    const cookieValue = await fetchCookieDetails({ data: "user" });

    if (!cookieValue) return;

    const userDetails = await getExistingUser({ data: { id: cookieValue.id } });

    if (!userDetails) return;

    return userDetails;
  },
});

function RouteComponent() {
  return (
    <>
      <Navbar />
      <main className={cn(`px-4 pt-20`)}>
        <Outlet />
      </main>
    </>
  );
}

export default function Navbar() {
  const [isReferOpen, setIsReferOpen] = useState(false);
  const [isHelplineOpen, setIsHelplineOpen] = useState(false);
  const loaderData = useLoaderData({ from: "/(authenticated-routes)" });
  const navigate = useNavigate();

  if (!loaderData) return null;

  const { role } = loaderData;

  async function handleSignOut() {
    await signout();
    navigate({ to: "/" });
  }

  const NavLinks = () => (
    <>
      <Link to="/" className="hover:text-primary text-sm font-medium">
        Home
      </Link>

      {role === "admin" && (
        <Link to="/manage" className="hover:text-primary text-sm font-medium">
          Manage
        </Link>
      )}
      <Link to="/kyc" className="hover:text-primary text-sm font-medium">
        KYC
      </Link>

      {/* Refer Modal */}
      <Dialog open={isReferOpen} onOpenChange={setIsReferOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            Refer
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Refer a Friend</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground text-sm">
            Invite your friends and earn badges.
          </p>
        </DialogContent>
      </Dialog>

      {/* Helpline Modal */}
      <Dialog open={isHelplineOpen} onOpenChange={setIsHelplineOpen}>
        <DialogTrigger asChild>
          <Button size="sm">Helpline</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Helpline Support</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground text-sm">
            Contact us at support@example.com
          </p>
        </DialogContent>
      </Dialog>
    </>
  );

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="size-12 text-lg font-bold">
          <Image src={sbsMarketing} alt="sbs-logo" layout="fullWidth" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-6 md:flex">
          <NavLinks />

          {/* Avatar + Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer bg-red-500">
                <AvatarImage src="/avatar.png" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-40">
              <Button
                variant="destructive"
                className="w-full"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </PopoverContent>
          </Popover>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="mt-0 flex flex-col gap-4 px-4 py-10"
            >
              <NavLinks />

              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="mt-4 cursor-pointer">
                    <AvatarImage src="/avatar.png" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-40">
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </PopoverContent>
              </Popover>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
