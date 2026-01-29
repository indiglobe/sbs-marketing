import type { Decorator } from "@storybook/react-vite";
import {
  createRootRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";

export const RouterDecorator: Decorator = (Story) => {
  const rootRoute = createRootRoute({ component: () => <Story /> });
  const routeTree = rootRoute;
  const router = createRouter({ routeTree });
  return <RouterProvider router={router} />;
};
