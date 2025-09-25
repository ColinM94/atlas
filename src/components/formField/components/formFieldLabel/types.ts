export interface Props {
  label: string | undefined;
  subtitle: string | undefined;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
}
