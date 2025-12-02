import { Book, Film } from "types/entertainment";
import { Person } from "types/person";

export const defaultPerson = (): Person => ({
  id: "",
  name: "",
});

export const defaultfilm = (): Film => ({
  id: "",
  name: "",
  director: "",
  coverImageUrl: "",
  backgroundImageUrl: "",
  rating: 0,
});

export const defaultBook = (): Book => ({
  id: "",
  isbn: "",
  title: "",
  author: "",
  coverImageUrl: "",
  rating: 0,
});

export const defaultTask = () => ({ dueDate: 0, name: "", done: false });
