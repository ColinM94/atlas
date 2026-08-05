import { icons } from 'constants/icons';
import { classes } from 'utils/classes';
import { IconName } from 'types/general';

import styles from './styles.module.scss';
import { IconProps } from './types';

export const Icon = (props: IconProps) => {
  const { icon, title, onClick, style, size = 'large', className } = props;

  const IconComponent = icons[icon as IconName] || icons.QuestionMark;

  return (
    <div
      style={style}
      onClick={onClick}
      className={classes(styles.container, styles[size], className)}
    >
      <IconComponent title={title || ''} className={styles.icon} />
    </div>
  );
};
