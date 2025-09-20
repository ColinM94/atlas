import { MaterialSymbol } from "material-symbols";
import { FormFieldProps } from "../formField/types";

export interface InputTextProps<T extends string> extends FormFieldProps {
  value?: T;
  setValue?: (value: T, e: React.ChangeEvent<HTMLInputElement>) => void;
  inputClassName?: string;
  placeholder?: string;
  type?: "password" | "text" | "email" | "url";
  disabled?: boolean;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  rightText?: string;
  inputIcon?: MaterialSymbol;
  actionIcon?: MaterialSymbol;
  onActionClick?: () => void;
  focusOnLoad?: boolean;
  characterLimit?: number;
  showDisabledStyle?: boolean;
}
