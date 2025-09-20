import { MaterialSymbol } from "material-symbols";
import { Layer } from "types/general";

interface ButtonPropsBase {
  label?: string;
  icon?: MaterialSymbol;
  onClick: (e: HTMLButtonElement["onclick"]) => void;
  // onMouseEnter: HTMLButtonElement["onmouseenter"];
  className?: string;
}

interface ButtonPropsGeneral extends ButtonPropsBase {
  type: "primary" | "danger";
}

export interface ButtonPropsSecondary extends ButtonPropsBase {
  type: "secondary";
  layer?: Layer;
}

export type ButtonProps = ButtonPropsGeneral | ButtonPropsSecondary;
