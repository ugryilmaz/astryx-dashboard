import { createFileRoute, redirect } from "@tanstack/react-router";
import LoginSimple from "../pages/Login";

export const Route = createFileRoute("/login")({
  beforeLoad: ({ context }) => {
    if (context.auth) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: () => <LoginSimple />,
});
