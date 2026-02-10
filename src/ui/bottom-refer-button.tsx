import { env } from "@/integrations/env";
import { Route } from "@/routes/(auth)/index";
import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

export default function BottomReferButton({
  ...props
}: ComponentProps<"button">) {
  const { userid } = Route.useLoaderData();
  const shareableUrl = `${env.VITE_APP_HOST_URL}/signup?referal-code=${userid!}`;

  const copyTextToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareableUrl);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <button
      onClick={copyTextToClipboard}
      {...props}
      className={cn(
        `bg-brand-600 text-brand-50 rounded-sm px-4 py-1.5`,
        props.className,
      )}
    >
      Copy referal link
    </button>
  );
}
