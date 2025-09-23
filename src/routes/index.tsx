import { createFileRoute } from "@tanstack/react-router"
import { Home } from "./_home/-home";

export const Route = createFileRoute("/")({
  component: Home,
});
