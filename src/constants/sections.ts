import { BooksPage } from 'pages/booksPage/booksPage';
import { FilmsPage } from 'pages/filmsPage/filmsPage';
import { HabitsPage } from 'pages/habitsPage/habitsPage';
import { PeoplePage } from 'pages/peoplePage/peoplePage';
import { ShoppingPage } from 'pages/shoppingPage/shoppingPage';
import { TasksPage } from 'pages/tasksPage/tasksPage';
import { Section } from 'types/section';

export const sections: Record<string, Section> = {
  tasks: {
    id: 'tasks',
    icon: 'check_box',
    name: 'Tasks',
    component: TasksPage,
  },
  shopping: {
    id: 'shopping',
    icon: 'shopping_bag',
    name: 'Shopping',
    component: ShoppingPage,
  },
  habits: {
    id: 'habits',
    icon: 'autorenew',
    name: 'Habit Tracker',
    component: HabitsPage,
  },
  people: {
    id: 'people',
    icon: 'group',
    name: 'People',
    component: PeoplePage,
  },
  books: {
    id: 'books',
    icon: 'book_2',
    name: 'Books',
    component: BooksPage,
  },
  films: {
    id: 'films',
    icon: 'movie',
    name: 'Films',
    component: FilmsPage,
  },
  tvSeries: {
    id: 'tvSeries',
    icon: 'tv',
    name: 'TV Series',
    component: FilmsPage,
  },
} as const;
