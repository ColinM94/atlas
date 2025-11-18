import { classes } from "utils/classes";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const Divider = (props: Props) => {
  const { layer } = props;

  return <div className={classes(styles.container, `layer${layer}`)} />;
};
