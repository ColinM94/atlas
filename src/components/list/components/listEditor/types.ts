import { Collection, DatabaseRecord } from 'types/general';

export interface ListEditorProps<T> {
  state: T & DatabaseRecord;
  updateState: (update: T & DatabaseRecord) => void;
  show: boolean;
  setShow: (show: boolean) => void;
  collection: Collection;
  inputs: { inputType: 'text' | 'date'; propertyKey: keyof T }[];
  onUpdate: () => void;
}
