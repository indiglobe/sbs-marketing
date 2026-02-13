import { useNavigate, useRouteContext } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "./shadcn/avatar";
import { Button } from "./shadcn/button";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "./shadcn/popover";
import { cn } from "@/utils/cn";
import { authClient } from "@/lib/auth/auth-client";

export function AvatarPopover() {
  const {
    session: { user },
  } = useRouteContext({ from: "/(auth)" });
  const navigate = useNavigate();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            `border-0 bg-transparent p-0 shadow-none hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent`,
          )}
        >
          <UserAvatar />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className={cn(`w-max`)}>
        <PopoverHeader>
          <PopoverTitle>{user.name}</PopoverTitle>
          <div className={cn(`mt-4`)}>
            <Button
              onClick={async () => {
                await authClient.signOut();
                navigate({ to: "/" });
              }}
              variant={"destructive"}
            >
              Sign out
            </Button>
          </div>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
}

export function UserAvatar() {
  const {
    session: { user },
  } = useRouteContext({ from: "/(auth)" });

  return (
    <Avatar>
      <AvatarImage src={user.image!} />
      <AvatarFallback>
        {`${user.name[0]}${user.name[1]}`.toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
