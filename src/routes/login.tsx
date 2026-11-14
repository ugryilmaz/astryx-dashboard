import { createFileRoute } from "@tanstack/react-router";
import LoginSimple from "../features/login-card/page";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return <LoginSimple />;
}
