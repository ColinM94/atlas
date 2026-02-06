import { Collection, DatabaseRecord } from 'types/general';
import { ListEditorProps } from './components/listEditor/types';

export type ListItemData<T> = {
  id: string;
  data: T & DatabaseRecord;
  imageUrl?: string;
  backgroundImageUrl?: string;
  name: string;
  subtitle?: string;
  rating?: number;
  date?: number;
  layout?: 'compact' | 'full';
  checked?: boolean;
};

export interface Props<T> {
  items: (data: T) => ListItemData<T & DatabaseRecord>;
  defaultData: () => T & DatabaseRecord;
  mainPropertyKey: keyof (T & DatabaseRecord);
  collection: Collection;
  layout?: 'compact' | 'full';
  aspectRatio?: number;
  inputs: ListEditorProps<T>['inputs'];
}
