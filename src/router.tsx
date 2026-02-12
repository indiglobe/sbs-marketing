import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import * as TanstackQuery from "./integrations/tanstack/querry";
import { routeTree } from "./routeTree.gen";
import { fetchSession } from "@/lib/auth/session";
import { getUserDetails } from "@/integrations/server-function/db-querry/users";

// -----------------------------
// Types
// -----------------------------
export type AppSession = Awaited<ReturnType<typeof fetchSession>>;
export type AppUserDetails = Awaited<ReturnType<typeof getUserDetails>>;

export interface AppRouterContext {
  queryClient: ReturnType<typeof TanstackQuery.getContext>["queryClient"];
  session: AppSession | null;
  userDetails: AppUserDetails | null;
}

export type BeforeLoadRouterContext = Partial<AppRouterContext>;

// -----------------------------
// Create router
// -----------------------------
export const getRouter = async () => {
  const rqContext = TanstackQuery.getContext();
  const queryClient = rqContext.queryClient;

  const session = await fetchSession();

  // ✅ Proper null-safe assignment
  const userDetails: AppUserDetails | null = session
    ? await getUserDetails({ data: { email: session.user.email } })
    : null;

  const context: AppRouterContext = {
    queryClient,
    session,
    userDetails,
  };

  const router = createRouter({
    routeTree,
    context,
    defaultPreload: "intent",
    Wrap: ({ children }) => (
      <TanstackQuery.Provider {...rqContext}>{children}</TanstackQuery.Provider>
    ),
  });

  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  });

  return router;
};
