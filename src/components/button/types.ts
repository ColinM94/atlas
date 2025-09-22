import { MaterialSymbol } from "material-symbols";
import { CSSProperties } from "react";
import { Layer } from "types/general";

interface ButtonPropsBase {
  label?: string | number;
  icon?: MaterialSymbol;
  onClick: (e: HTMLButtonElement["onclick"]) => void;
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
