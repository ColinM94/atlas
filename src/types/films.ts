import { DatabaseRecord } from "./general";

export interface Film extends DatabaseRecord {
  id: string;
  name: string;
  director: string;
  coverImageUrl: string;
  backgroundImageUrl: string;
  rating: number;
}
