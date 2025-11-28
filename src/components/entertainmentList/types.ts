export type EntertainmentItem = {
  id: string;
  imageUrl: string;
  backgroundImageUrl?: string;
  name: string;
  subtitle: string;
  rating: number;
};

export interface Props {
  items: EntertainmentItem[];
  onEditClick: (item: EntertainmentItem) => void;
}
