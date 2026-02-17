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
import { Copy, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import sbsMarketing from "@/assets/sbs.png";
import { useLatestEvent } from "@/hooks/use-latest-event";
import { env } from "@/lib/env";

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
  const loaderData = useLoaderData({ from: "/(authenticated-routes)" });
  const referrerUrl = `${env.VITE_APP_HOST}/signup?referrer_id=${loaderData?.id}&referrer_name=${loaderData?.name}`;

  function copyTextToClipboard() {
    navigator.clipboard
      .writeText(referrerUrl)
      .then(() => {
        console.log("Text successfully copied to clipboard");
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  }

  return (
    <>
      <Navbar copyTextToClipboard={copyTextToClipboard} />
      <main className={cn(`mb-22 px-4 pt-10 pb-24`)}>
        <Outlet />
      </main>
      <Footer copyTextToClipboard={copyTextToClipboard} />
    </>
  );
}

export function Navbar({
  copyTextToClipboard,
}: {
  copyTextToClipboard: () => void;
}) {
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
      <Link
        to="/"
        className="text-sm font-medium text-white hover:text-white/50"
      >
        Home
      </Link>

      {role === "admin" && (
        <Link
          to="/manage"
          className="text-sm font-medium text-white hover:text-white/50"
        >
          Manage
        </Link>
      )}
      <Link
        to="/my-team"
        className="text-sm font-medium text-white hover:text-white/50"
      >
        My Team
      </Link>
      <Link
        to="/kyc"
        className="text-sm font-medium text-white hover:text-white/50"
      >
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
          <div>
            <p className="text-muted-foreground text-sm">
              Invite your friends and earn badges.
            </p>
            <div
              className={cn(
                `mt-4 flex w-full justify-between rounded-md border border-green-500 bg-green-100 px-3 py-1 text-green-500`,
              )}
            >
              <div>{loaderData.id}</div>
              <button onClick={copyTextToClipboard}>
                <Copy className={cn(`size-4`)} />
              </button>
            </div>
          </div>
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
          <div className="text-muted-foreground text-sm">
            <p>Head office:</p>
            <p>
              S Gouripur, P.S - Sagardighi, Dist - Murshidabad, PIN - 742122
            </p>
            <br />
            <p>
              You can call us at <a href="tel:8509848506">8509848506</a>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );

  return (
    <header className="border-b bg-[#33436b]">
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
            <PopoverTrigger asChild className={cn(`text-white`)}>
              <Avatar className="cursor-pointer">
                <AvatarImage src="/avatar.png" />
                <AvatarFallback>
                  {loaderData.name[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-40">
              <Link
                to="/profile"
                className={cn(`mb-6 inline-block text-lg font-semibold`)}
              >
                {loaderData.name}
              </Link>
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

        <div className={cn(`flex items-center justify-center gap-4 md:hidden`)}>
          <div className={cn(`md:hidden`)}>
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="/avatar.png" />
                  <AvatarFallback>
                    {loaderData.name[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-40">
                <Link
                  to="/profile"
                  className={cn(`mb-6 inline-block text-lg font-semibold`)}
                >
                  {loaderData.name}
                </Link>
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
                  <Menu className="h-5 w-5 text-white hover:text-black" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="mt-0 flex flex-col gap-4 bg-[#33436b] px-4 py-10"
              >
                <NavLinks />

                <Popover>
                  <PopoverTrigger asChild className={cn(`max-md:hidden`)}>
                    <Avatar className="mt-4 cursor-pointer">
                      <AvatarImage src="/avatar.png" />
                      <AvatarFallback>{loaderData.name[0]}</AvatarFallback>
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
      </div>
    </header>
  );
}

export function Footer({
  copyTextToClipboard,
}: {
  copyTextToClipboard: () => void;
}) {
  const [isReferOpen, setIsReferOpen] = useState(false);
  const { data } = useLatestEvent();
  const loaderData = useLoaderData({ from: "/(authenticated-routes)" });

  return (
    <footer className={cn(`fixed bottom-0 w-full bg-[#33436b]`)}>
      <div
        className={cn(
          `container mx-auto my-4 mb-4 flex flex-col items-center justify-center gap-y-4 px-4 sm:flex-row sm:justify-between`,
        )}
      >
        <Dialog open={isReferOpen} onOpenChange={setIsReferOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" onClick={copyTextToClipboard}>
              Refer Now
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Refer a Friend</DialogTitle>
            </DialogHeader>
            <div>
              <p className="text-muted-foreground text-sm">
                Invite your friends and earn badges.
              </p>
              <div
                className={cn(
                  `mt-4 flex w-full justify-between rounded-md border border-green-500 bg-green-100 px-3 py-1 text-green-500`,
                )}
              >
                <div>{loaderData?.id}</div>
                <button onClick={copyTextToClipboard}>
                  <Copy className={cn(`size-4`)} />
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {data && (
          <div className={cn(`inline-block`)}>
            <div className={cn(`mb-2 text-center text-lg text-white`)}>
              Time untill next event
            </div>
            <Countdown targetDate={new Date(data)} />
          </div>
        )}
      </div>
    </footer>
  );
}

type CountdownProps = {
  targetDate: Date;
};

function getTimeLeft(targetDate: Date) {
  const difference = targetDate.getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const Item = ({ value, label }: { value: number; label: string }) => (
    <div className="bg-card border-border flex min-w-16 flex-col items-center justify-center rounded-md border shadow-sm sm:min-w-20">
      <span className="text-foreground text-xl font-bold tabular-nums sm:text-3xl">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="text-muted-foreground mt-1 text-[10px] tracking-wide uppercase">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Item value={timeLeft.days} label="Days" />
      <Item value={timeLeft.hours} label="Hours" />
      <Item value={timeLeft.minutes} label="Minutes" />
      <Item value={timeLeft.seconds} label="Seconds" />
    </div>
  );
}
