import { createFileRoute } from "@tanstack/react-router";
import { Habits } from "./-habits";

export const Route = createFileRoute("/_sections/habits/")({
  component: Habits,
});
