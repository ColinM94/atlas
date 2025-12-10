import { DatabaseRecord } from './general';

export interface ShoppingItemData extends DatabaseRecord {
  name: string;
  done: boolean;
}
