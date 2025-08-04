import { classes } from "utils/classes";
import { Icon } from "components/icon/icon";

import { ButtonProps } from "./types";
import styles from "./styles.module.css";

export const Button = (props: ButtonProps) => {
  const {
    icon,
    label,
    onClick,
    surface = 0,
    className,
    iconClassName,
    labelClassName,
  } = props;

  return (
    <button
      onClick={onClick}
      className={classes(
        className,
        styles.container,
        styles[`surface${surface}`]
      )}
    >
      {icon && (
        <Icon icon={icon} className={classes(styles.icon, iconClassName)} />
      )}

      {label && (
        <div className={classes(styles.label, labelClassName)}>{label}</div>
      )}
    </button>
  );
};
