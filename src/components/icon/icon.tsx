import { classes } from "utils/classes";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const Icon = ({ icon, title, onClick, style, className }: Props) => {
  return (
    <span
      title={title}
      onClick={onClick}
      style={style}
      className={classes(
        "material-symbols-rounded",
        className,
        styles.container
      )}
    >
      {icon}
    </span>
  );
};
