import { MaterialSymbol } from 'material-symbols';

export interface Props {
  icon: MaterialSymbol;
  title?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
}
