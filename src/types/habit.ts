import { DatabaseRecord } from "./general";

export interface Habit extends DatabaseRecord {
  name: string;
  dates: Record<string, boolean>;
}
