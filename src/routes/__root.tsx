import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { DevTools } from "../integrations/tanstack/devtools";
import appCss from "../styles/styles.css?url";
import type { QueryClient } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

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
    scripts: [],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
      },
    ],
  }),

  shellComponent: RootDocument,

  notFoundComponent: () => <></>,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="min-vh-100">
        {children}

        <Toaster position="bottom-right" />
        {/* <ThemeProvider> */}
        {/* </ThemeProvider> */}
        <DevTools />
        <Scripts />
      </body>
    </html>
  );
}
