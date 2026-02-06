import { Collection } from 'types/general';

export interface ListEditorProps<T> {
  state: T;
  updateState: (update: T) => void;
  show: boolean;
  setShow: (show: boolean) => void;
  collection: Collection;
  inputs: { inputType: 'text' | 'date'; propertyKey: keyof T }[];
  onUpdate: () => void;
}
