import { useLoaderData } from "@tanstack/react-router";
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

export function AvatarPopover() {
  const { session } = useLoaderData({ from: "/(auth)" });

  if (!session) return null;

  const { user } = session;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <UserAvatar />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className={cn(`w-max`)}>
        <PopoverHeader>
          <PopoverTitle>{user.name}</PopoverTitle>
          <div className={cn(`mt-4`)}>
            <Button variant={"destructive"}>Sign out</Button>
          </div>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
}

export function UserAvatar() {
  const { session } = useLoaderData({ from: "/(auth)" });

  if (!session) return null;

  const { user } = session;

  return (
    <Avatar>
      <AvatarImage src={user.image!} />
      <AvatarFallback>
        {`${user.name[0]}${user.name[1]}`.toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
