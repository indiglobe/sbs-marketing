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
import { useLoaderData } from "@tanstack/react-router";

export function HelpLineDialog() {
  const { userid } = useLoaderData({ from: "/(auth)" });
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
