import { CSSProperties } from 'react';
import { MaterialSymbol } from 'material-symbols';
import { Layer } from 'types/general';

interface ButtonPropsBase {
  to?: string;
  label?: string | number;
  icon?: MaterialSymbol;
  rightIcon?: MaterialSymbol;
  iconColor?: 'primary' | 'secondary' | 'danger';
  isFormSubmit?: boolean;
  onClick?: ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
  centerLabel?: boolean;
  labelClassName?: string;
  title?: string;
  // onMouseEnter: HTMLButtonElement["onmouseenter"];
  style?: CSSProperties;
  className?: string;
  iconClassName?: string;
}

interface ButtonPropsGeneral extends ButtonPropsBase {
  type: 'primary' | 'danger' | 'transparent';
}

export interface ButtonPropsSecondary extends ButtonPropsBase {
  type: 'secondary';
  layer?: Layer;
}

export type ButtonProps = ButtonPropsGeneral | ButtonPropsSecondary;
