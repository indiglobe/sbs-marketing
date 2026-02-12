import { Button } from "@/ui/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/shadcn/dialog";
import { useRouteContext } from "@tanstack/react-router";

export function ReferDialog() {
  // const { userid } = useLoaderData({ from: "/(auth)" });
  const { userDetails } = useRouteContext({ from: "/(auth)" });

  if (!userDetails) return null;

  const { id: userid } = userDetails;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">Refer</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Refer to your friend</DialogTitle>
          <DialogDescription>
            Refer to your friend and earn a badge.
          </DialogDescription>
        </DialogHeader>

        <div>{userid}</div>

        <DialogFooter>
          <Button type="button">Copy referral link</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
