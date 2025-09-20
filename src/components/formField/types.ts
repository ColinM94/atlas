import { Children } from 'types';

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
  tooltipTitle?: string;
  tooltipMessage?: string;
  title?: string;
  horizontal?: boolean;
  required?: boolean;
  onClick?: () => void;
  labelPosition?: 'before' | 'after';
  children?: Children;
  layer?: 1 | 2 | 3;
  enableCardContainer?: boolean;
}
