import { DatabaseRecord } from "./general";

export interface Book extends DatabaseRecord {
  id: string;
  isbn: string;
  title: string;
  author: string;
  coverImageUrl: string;
}
