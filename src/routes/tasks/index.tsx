import { createFileRoute } from "@tanstack/react-router";
import { Tasks } from "./-tasks";

export const Route = createFileRoute("/tasks/")({
  component: Tasks,
});
