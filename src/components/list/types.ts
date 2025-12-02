export type ListItemData = {
  id: string;
  imageUrl?: string;
  backgroundImageUrl?: string;
  name: string;
  subtitle?: string;
  rating?: number;
  layout?: "compact" | "full";
};

export interface Props {
  items: ListItemData[];
  onEditClick: (item: ListItemData) => void;
  layout?: "compact" | "full";
  aspectRatio?: number;
}
