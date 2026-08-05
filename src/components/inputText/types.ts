import { Children, IconName } from 'types/general';
import { FormFieldProps } from '../formField/types';

export interface InputTextProps extends FormFieldProps {
  value?: string;
  setValue?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  inputClassName?: string;
  placeholder?: string;
  type?: 'password' | 'text' | 'email' | 'url';
  disabled?: boolean;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  rightText?: string;
  inputIcon?: IconName;
  actionIcon?: IconName;
  onActionClick?: () => void;
  focusOnLoad?: boolean;
  characterLimit?: number;
  showDisabledStyle?: boolean;
  ref?: React.RefObject<HTMLInputElement | null>;
  children?: Children;
}
