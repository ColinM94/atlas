import { DatabaseRecord } from './general';

export interface Task extends DatabaseRecord {
  name: string;
  dueDate: number;
  checked: boolean;
}
