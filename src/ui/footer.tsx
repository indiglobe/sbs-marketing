import { cn } from "@/utils/cn";
import { ReferDialog } from "./refer-dialog";

export default function Footer() {
  return (
    <footer
      className={cn(
        `fixed bottom-0 left-0 w-full bg-blue-300 dark:bg-blue-900`,
      )}
    >
      <ReferDialog />
    </footer>
  );
}
