import { Children } from "types/general";

export interface Props extends FormFieldProps {
  children: Children;
}

export interface FormFieldProps {
  id?: string;
  className?: string;
  label?: string;
  /** Text shown below label. */
  labelDescription?: string;
  labelContainerClassName?: string;
  inputContainerClassName?: string;
  title?: string;
  horizontal?: boolean;
  required?: boolean;
  onClick?: () => void;
  disabled: boolean | undefined;
  labelPosition?: "before" | "after";
  children?: Children;
  layer?: 0 | 1 | 2 | 3;
}
