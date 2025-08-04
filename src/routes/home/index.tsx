import { createFileRoute } from "@tanstack/react-router";
import { Home } from "./-home";

export const Route = createFileRoute("/home/")({
  component: Home,
});
