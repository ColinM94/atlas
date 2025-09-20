import { FormFieldProps } from 'components/formField/types';

export interface InputDateProps extends Omit<FormFieldProps, 'onClick'> {
  value?: number;
  setValue: (value: number) => void;
  inputClassName?: string;
  placeholder?: string;
  disabled?: boolean;
  mode?: 'local' | 'utc';
  time?: 'startOfDay' | 'endOfDay';
  min?: string;
  type?: 'date' | 'datetime';
}
