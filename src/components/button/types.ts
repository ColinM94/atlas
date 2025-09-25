import { CSSProperties } from "react";
import { MaterialSymbol } from "material-symbols";
import { Layer } from "types/general";

interface ButtonPropsBase {
  label?: string | number;
  icon?: MaterialSymbol;
  onClick:
    | ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  labelClassName?: string;
  // onMouseEnter: HTMLButtonElement["onmouseenter"];
  style?: CSSProperties;
  className?: string;
  iconClassName?: string;
}

interface ButtonPropsGeneral extends ButtonPropsBase {
  type: "primary" | "danger";
}

export interface ButtonPropsSecondary extends ButtonPropsBase {
  type: "secondary";
  layer?: Layer;
}

export type ButtonProps = ButtonPropsGeneral | ButtonPropsSecondary;
