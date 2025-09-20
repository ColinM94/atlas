import { DatabaseRecord } from "./general";

export interface Country extends DatabaseRecord {
  id: string;
  name: string;
}
