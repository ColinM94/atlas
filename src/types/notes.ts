import { DatabaseRecord } from "./general";

export interface Note extends DatabaseRecord {
  heading: string;
  text: string;
  userId: string;
}
