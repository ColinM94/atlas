import { classes } from "utils/classes";
import { Icon } from "components/icon/icon";

import { ButtonProps } from "./types";
import styles from "./styles.module.scss";

export const Button = (props: ButtonProps) => {
  const {
    label,
    style,
    title,
    type,
    icon,
    rightIcon,
    iconColor,
    centerLabel,
    className,
    iconClassName,
    labelClassName,
    onClick,
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

      {label && (
        <div
          className={classes(
            styles.label,
            centerLabel && styles.centerLabel,
            labelClassName
          )}
        >
          {label}
        </div>
      )}

      {(rightIcon || (icon && centerLabel)) && (
        <Icon
          icon={rightIcon || "10k"}
          className={classes(
            styles.icon,
            iconClassName,
            icon && !rightIcon && styles.invisible,
            iconColor && styles[`${iconColor}Icon`]
          )}
        />
      )}
    </button>
  );
};
