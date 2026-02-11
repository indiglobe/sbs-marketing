import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { DevTools } from "../integrations/tanstack/devtools";
import appCss from "../styles/styles.css?url";
import type { QueryClient } from "@tanstack/react-query";
import { ThemeProvider } from "@/integrations/theme/theme-provider";
import { cn } from "@/utils/cn";
import { RootNotFound } from "@/components/root-not-found";
import { RootError } from "@/components/root-error";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "SBS Marketing",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,

  notFoundComponent: RootNotFound,

  errorComponent: RootError,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className={cn(`flex max-w-svw flex-col`)}>
        <ThemeProvider>{children}</ThemeProvider>
        <DevTools />
        <Scripts />
      </body>
    </html>
  );
}
