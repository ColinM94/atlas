import { MaterialSymbol } from 'material-symbols';

export interface Section {
  id: string;
  icon: MaterialSymbol;
  name: string;
  component: React.ComponentType;
}
