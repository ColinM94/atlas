import { Section } from "types/section";

export const sections: Record<string, Section> = {
  tasks: {
    id: "tasks",
    icon: "check_box",
    name: "Tasks",
  },
  habits: {
    id: "habits",
    icon: "autorenew",
    name: "Habit Tracker",
  },
} as const;
