import { Collection } from 'types/general';
import { ListEditorProps } from './components/listEditor/types';

export type ListItemData<T> = {
  id: string;
  data: T;
  imageUrl?: string;
  backgroundImageUrl?: string;
  name: string;
  subtitle?: string;
  rating?: number;
  layout?: 'compact' | 'full';
};

export interface Props<T> {
  data: T[];
  items: (data: T) => ListItemData<T>;
  defaultData: () => T;
  collection: Collection;
  layout?: 'compact' | 'full';
  aspectRatio?: number;
  inputs: ListEditorProps<T>['inputs'];
}
