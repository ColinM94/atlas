import { IconName } from './general';

export interface Section {
  id: string;
  icon: IconName;
  name: string;
  component: React.ComponentType;
}
