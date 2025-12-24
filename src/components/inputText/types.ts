import { MaterialSymbol } from 'material-symbols';
import { Children } from 'types/general';
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
  inputIcon?: MaterialSymbol;
  actionIcon?: MaterialSymbol;
  onActionClick?: () => void;
  focusOnLoad?: boolean;
  characterLimit?: number;
  showDisabledStyle?: boolean;
  ref?: React.RefObject<HTMLInputElement | null>;
  children?: Children;
}
