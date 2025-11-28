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
  books: {
    id: "books",
    icon: "book_2",
    name: "Books",
  },
  films: {
    id: "films",
    icon: "movie",
    name: "Films",
  },
  tvSeries: {
    id: "tvSeries",
    icon: "tv",
    name: "TV Series",
  },
} as const;
