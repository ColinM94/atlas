import { IconName } from 'types/general';

export interface IconProps {
  icon: IconName;
  title?: string;
  size?: 'small' | 'medium' | 'large';
  onClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  style?: React.CSSProperties;
  className?: string;
}
