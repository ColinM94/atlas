export interface Props {
  label?: string;
  subtitle?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  showTooltip: boolean;
  className?: string;
}
