import { Section } from "types/section";

export const sections: Record<string, Section> = {
  tasks: {
    id: "tasks",
    icon: "check_box",
    name: "Tasks",
  },
  habitTracker: {
    id: "habits",
    icon: "autorenew",
    name: "Habit Tracker",
  },
};
