export type EntertainmentItem = {
  id: string;
  imageUrl: string;
  backgroundImageUrl?: string;
  name: string;
  subtitle: string;
  rating: number;
  layout?: "compact" | "full";
};

export interface Props {
  items: EntertainmentItem[];
  onEditClick: (item: EntertainmentItem) => void;
  layout?: "compact" | "full";
  aspectRatio?: number;
}
