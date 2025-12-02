import { DatabaseRecord } from "./general";

export interface Book extends DatabaseRecord {
  id: string;
  isbn: string;
  title: string;
  author: string;
  coverImageUrl: string;
  rating: number;
}

export interface Film extends DatabaseRecord {
  id: string;
  name: string;
  director: string;
  coverImageUrl: string;
  backgroundImageUrl: string;
  rating: number;
}

export interface TVShow extends DatabaseRecord {
  id: string;
  name: string;
  director: string;
  coverImageUrl: string;
  backgroundImageUrl: string;
  rating: number;
}
