import { AvatarPopover } from "@/ui/avatar-popover";
import { Logo } from "@/ui/logo";
import { NavigationItemsList } from "@/ui/nav-items";
import { cn } from "@/utils/cn";

export default function Navbar() {
  return (
    <nav className={cn(`flex w-full items-center justify-between`)}>
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
