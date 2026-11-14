import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Theme } from "@astryxdesign/core/theme";
import { neutralTheme } from "@astryxdesign/theme-neutral";

const RootLayout = () => (
  <>
    <Theme theme={neutralTheme}>
      <Outlet />
      <TanStackRouterDevtools />
    </Theme>
  </>
);

export const Route = createRootRoute({ component: RootLayout });
