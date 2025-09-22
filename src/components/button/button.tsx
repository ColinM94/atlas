import { classes } from "utils/classes";
import { Icon } from "components/icon/icon";

import { ButtonProps } from "./types";
import styles from "./styles.module.scss";

export const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      style={props.style}
      // onMouseEnter={props.onMouseEnter}
      className={classes(
        styles.container,
        styles[props.type],
        props.className,
        props.type === "secondary" &&
          `layer${props.layer ?? 0} layer${props.layer ?? 0}Hover`
      )}
    >
      {props.label}
      {props.icon && <Icon icon={props.icon} className={props.iconClassName} />}
    </button>
  );
};
