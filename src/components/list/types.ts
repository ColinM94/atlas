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
  layout?: 'compact' | 'full';
};

export interface Props<T> {
  items: (data: T) => ListItemData<T & DatabaseRecord>;
  defaultData: () => T & DatabaseRecord;
  mainPropertyKey: keyof T;
  collection: Collection;
  layout?: 'compact' | 'full';
  aspectRatio?: number;
  inputs: ListEditorProps<T>['inputs'];
}
