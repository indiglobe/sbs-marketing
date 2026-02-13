import { AvatarPopover } from "@/ui/avatar-popover";
import { Logo } from "@/ui/logo";
import { NavigationItemsList } from "@/ui/nav-items";
import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

export default function Navbar({ ...props }: ComponentProps<"nav">) {
  return (
    <nav
      {...props}
      className={cn(
        `flex w-full items-center justify-between bg-blue-400 px-4 sm:px-10 md:px-20 lg:px-30 dark:bg-blue-900`,
        props.className,
      )}
    >
      <div>
        <Logo />
      </div>
      <div>
        <NavigationItemsList />
      </div>
      <div>
        <span></span>
        <span className={cn(`flex p-2`)}>
          <AvatarPopover />
        </span>
      </div>
    </nav>
  );
}
