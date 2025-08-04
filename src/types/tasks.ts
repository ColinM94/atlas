import { DatabaseRecord } from "./general";

export interface Task extends DatabaseRecord {
  name: string;
  description: string;
  frequency: "once" | "daily" | "weekly" | "monthly";
  completed: boolean;
  userId: string;
}
