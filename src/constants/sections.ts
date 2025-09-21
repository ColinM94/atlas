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
  countries: {
    id: "countries",
    icon: "flag",
    name: "Countries",
  },
  people: {
    id: "people",
    icon: "groups",
    name: "People",
  },
  things: {
    id: "things",
    icon: "mobile",
    name: "Things",
  },
  tickets: {
    id: "tickets",
    icon: "airplane_ticket",
    name: "Tickets",
  },
  films: {
    id: "films",
    icon: "movie",
    name: "Movies",
  },
  tvShows: {
    id: "tvShows",
    icon: "tv",
    name: "TV Shows",
  },
  books: {
    id: "books",
    icon: "book",
    name: "Books",
  },
  shopping: {
    id: "shopping",
    icon: "shopping_bag",
    name: "Shopping",
  },
};
