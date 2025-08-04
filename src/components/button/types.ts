import { MaterialSymbol } from 'material-symbols';
import { ButtonClickEvent, Layer } from 'types/general';

interface ButtonPropsBase {
  label?: string;
  icon?: MaterialSymbol;
  onClick: (e: ButtonClickEvent) => void;
  className?: string;
}

interface ButtonPropsGeneral extends ButtonPropsBase {
  type: 'primary' | 'danger';
}

export interface ButtonPropsSecondary extends ButtonPropsBase {
  type: 'secondary';
  layer?: Layer;
}

export type ButtonProps = ButtonPropsGeneral | ButtonPropsSecondary;
