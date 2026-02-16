import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import * as TanstackQuery from "./integrations/tanstack/querry";
import { routeTree } from "./routeTree.gen";

export interface AppRouterContext {
  queryClient: ReturnType<typeof TanstackQuery.getContext>["queryClient"];
}

export type BeforeLoadRouterContext = Partial<AppRouterContext>;

export const getRouter = async () => {
  const rqContext = TanstackQuery.getContext();
  const queryClient = rqContext.queryClient;

  const context: AppRouterContext = {
    queryClient,
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
