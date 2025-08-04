import { MaterialSymbol } from "material-symbols";

export interface ButtonProps {
  icon?: MaterialSymbol;
  label?: string;
  onClick: () => void;
  surface?: 0 | 1 | 2;
  className?: string;
  iconClassName?: string;
  labelClassName?: string;
}
