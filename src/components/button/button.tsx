import { classes } from "utils/classes";
import { Icon } from "components/icon/icon";

import { ButtonProps } from "./types";
import styles from "./styles.module.scss";

export const Button = (props: ButtonProps) => {
  const {
    onClick,
    label,
    style,
    title,
    type,
    leftIcon,
    icon,
    iconColor,
    className,
    iconClassName,
    labelClassName,
  } = props;
  return (
    <button
      onClick={onClick}
      style={style}
      // onMouseEnter={onMouseEnter}
      title={title}
      className={classes(
        styles.container,
        styles[type],
        icon && !label ? styles.containerIconOnly : styles.containerNotIconOnly,
        className,
        type === "secondary" &&
          `layer${props.layer ?? 0} layer${props.layer ?? 0}Hover`
      )}
    >
      {leftIcon && (
        <Icon
          icon={leftIcon}
          className={classes(
            styles.icon,
            iconClassName,
            iconColor && styles[`${iconColor}Icon`]
          )}
        />
      )}

      {label && (
        <div className={classes(styles.label, labelClassName)}>{label}</div>
      )}

      {icon && (
        <Icon
          icon={icon}
          className={classes(
            styles.icon,
            iconClassName,
            iconColor && styles[`${iconColor}Icon`]
          )}
        />
      )}
    </button>
  );
};
