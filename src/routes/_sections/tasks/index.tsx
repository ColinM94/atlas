import { createFileRoute } from "@tanstack/react-router";
import { Tasks } from "./-tasks";

export const Route = createFileRoute("/_sections/tasks/")({
  component: Tasks,
});
