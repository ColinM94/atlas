import { DatabaseRecord } from "./general";

export interface Habit extends DatabaseRecord {
  name: string;
}

export interface HabitData extends DatabaseRecord {
  habitId: string;
  date: string;
  isAchieved: boolean;
}
