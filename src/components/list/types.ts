export interface ListProps<T> {
  items: T[];
  setItems: (items: T[]) => void;
  onDeleteClick: (item: T) => void;
  keyExtractor: (item: T) => string;
}
