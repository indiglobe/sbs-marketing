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
import { PhoneCall } from "lucide-react";

export function HelpLineDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            `bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent`,
          )}
        >
          Help
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Helpline</DialogTitle>
          <DialogDescription>If you want help from our side.</DialogDescription>
        </DialogHeader>

        {/* <div
          className={cn(
            `flex justify-between rounded-md border border-green-500 px-4 py-2 text-green-500 dark:text-green-700`,
          )}
        >
          <div className={cn(`text-lg`)}>{userid}</div>
          <button onClick={copyToClipboard}>
            <Copy className={cn(``)} />
          </button>
        </div> */}

        <div className={cn(``)}>
          <a
            href="tel:1234567890"
            className={cn(
              `flex justify-between rounded-md border border-blue-500 px-4 py-2 text-blue-500 dark:text-blue-700`,
            )}
          >
            <span className={cn(`text-lg`)}>1234567890</span>
            <PhoneCall className={cn(``)} />
          </a>
        </div>

        {/* <div>
          <a
            className={cn(`flex items-center gap-4 text-blue-500`)}
            href="tel:1234567890"
          >
            <span>
              <PhoneCall className={cn(`text-blue-500`)} />
            </span>
            <span className={cn(`text-lg`)}>1234567890</span>
          </a>
        </div> */}

        <DialogFooter>
          <a href="tel:1234567890">
            <Button type="button">Call now</Button>
          </a>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
