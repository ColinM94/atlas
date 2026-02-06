import { Link } from 'wouter';

import { classes } from 'utils/classes';
import { Icon } from 'components/icon/icon';

import { ButtonProps } from './types';
import styles from './styles.module.scss';

export const Button = (props: ButtonProps) => {
  const {
    to,
    label,
    style,
    title,
    type = 'secondary',
    isFormSubmit,
    icon,
    rightIcon,
    iconColor,
    centerLabel,
    className,
    iconClassName,
    labelClassName,
    onClick,
  } = props;

  const content = () => (
    <>
      {icon && (
        <Icon
          icon={icon}
          className={classes(styles.icon, iconClassName, iconColor && styles[`${iconColor}Icon`])}
        />
      )}

      {label && (
        <div className={classes(styles.label, centerLabel && styles.centerLabel, labelClassName)}>
          {label}
        </div>
      )}

      {(rightIcon || (icon && centerLabel)) && (
        <Icon
          icon={rightIcon || '10k'}
          className={classes(
            styles.icon,
            iconClassName,
            icon && !rightIcon && styles.invisible,
            iconColor && styles[`${iconColor}Icon`]
          )}
        />
      )}
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        title={title}
        className={classes(
          styles.container,
          styles[type],
          icon && !label ? styles.containerIconOnly : styles.containerNotIconOnly,
          className,
          props.type === 'secondary' && `layer${props.layer ?? 0} layer${props.layer ?? 0}Hover`
        )}
      >
        {content()}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      style={style}
      // onMouseEnter={onMouseEnter}
      type={isFormSubmit ? 'submit' : 'button'}
      title={title}
      className={classes(
        styles.container,
        styles[type],
        icon && !label ? styles.containerIconOnly : styles.containerNotIconOnly,
        className,
        props.type === 'secondary' && `layer${props.layer ?? 0} layer${props.layer ?? 0}Hover`
      )}
    >
      {content()}
    </button>
  );
};
