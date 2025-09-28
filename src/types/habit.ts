import { DatabaseRecord } from "./general";

export interface Habit extends DatabaseRecord {
  name: string;
  dates: Record<string, boolean>;
}

export interface HabitDataYears {
  [year: number]: {
    [month: number]: HabitDataMonth;
  };
}

export interface HabitDataMonth {
  numDaysInMonth: number;
  month: number;
  year: number;
  habits: Record<
    string,
    {
      id: string;
      name: string;
      dates: Record<string, boolean>;
    }
  >;
}

export interface HabitData {
  name: string;
  dates: Record<string, boolean>;
  month: number;
  year: number;
  numDaysInMonth: number;
}
