import { env } from "@/lib/env";
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
import { cn } from "@/utils/cn";
import { useRouteContext } from "@tanstack/react-router";
import { Copy } from "lucide-react";

export function ReferDialog() {
  const { userDetails } = useRouteContext({ from: "/(auth)/(existing-user)" });

  const { id: userid } = userDetails;

  const referalLink = `${env.VITE_APP_HOST}/signin?referrer=${userid}`;

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(referalLink);
      console.log("Text successfully copied to clipboard");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            `bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent`,
          )}
        >
          Refer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Refer to your friend</DialogTitle>
          <DialogDescription>
            Copy this link and share to your friend and earn a badge.
          </DialogDescription>
        </DialogHeader>

        <div
          className={cn(
            `flex justify-between rounded-md border border-green-500 px-4 py-2 text-green-500 dark:text-green-700`,
          )}
        >
          <div className={cn(`text-lg`)}>{userid}</div>
          <button onClick={copyToClipboard}>
            <Copy className={cn(``)} />
          </button>
        </div>

        <DialogFooter>
          <Button type="button" onClick={copyToClipboard}>
            Copy referral link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
