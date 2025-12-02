import { DatabaseRecord } from "./general";

export interface Person extends DatabaseRecord {
  name: string;
}
