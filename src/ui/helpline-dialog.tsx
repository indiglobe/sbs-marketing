import { AppRouterContext } from "@/router";
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

export function HelpLineDialog() {
  const { userDetails }: AppRouterContext = useRouteContext({
    from: "/(auth)",
  });

  if (!userDetails) return null;

  const { id: userid } = userDetails;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">Help</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Helpline</DialogTitle>
          <DialogDescription>If you want help from our side.</DialogDescription>
        </DialogHeader>

        <div>{userid}</div>

        <DialogFooter>
          <Button type="button">Copy referral link</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
