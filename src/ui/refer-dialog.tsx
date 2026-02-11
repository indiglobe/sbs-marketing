import { ComponentProps } from "react";
import { Button } from "./shadcn/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./shadcn/dialog";

export function ReferDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <ItemDialogTrigger />
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Refer to your friend.</DialogTitle>
          <DialogDescription>
            Refer to your friend and earn badges.
          </DialogDescription>
        </DialogHeader>

        {/* <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}

export function ItemDialogTrigger({
  children,
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <Button {...props} variant="outline">
      {children}
    </Button>
  );
}
