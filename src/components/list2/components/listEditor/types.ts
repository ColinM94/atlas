import { Collection } from 'types/general';

export interface ListEditorProps<T> {
  id: string | undefined;
  data: T | undefined;
  show: boolean;
  setShow: (show: boolean) => void;
  collection: Collection;
  defaultData: () => T;
  inputs: { inputType: 'text' | 'date'; propertyKey: keyof T }[];
}
