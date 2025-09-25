import { classes } from "utils/classes";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const FormFieldLabel = (props: Props) => {
  const { className, label, subtitle, onClick } = props;

  return (
    <div className={classes(className, styles.container)}>
      <div className={classes(styles.titleContainer)} onClick={onClick}>
        <div className={styles.title}>{label}</div>
      </div>

      <div className={classes(styles.subtitleContainer)} onClick={onClick}>
        <div className={styles.subtitle}>{subtitle}</div>
      </div>
    </div>
  );
};
