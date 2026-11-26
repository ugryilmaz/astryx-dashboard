import { createFileRoute, redirect } from "@tanstack/react-router";
import DataDashboardPage from "../pages/DataDashboardPage";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: ({ context, location }) => {
    console.log(context);
    if (!context.auth) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: () => <DataDashboardPage />,
});
