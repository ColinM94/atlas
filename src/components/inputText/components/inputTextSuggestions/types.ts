import { InputOption } from 'types';

export interface Props {
  suggestions?: InputOption<string>[];
  onClick?: (suggestion: string) => void;
  className?: string;
}
