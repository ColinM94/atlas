import { classes } from "utils/classes";
import { useAppStore } from "stores/appStore";

import { Props } from "./types";
import styles from "./styles.module.css";

export const Header = (props: Props) => {
  const { className } = props;

  const { user } = useAppStore();

  return (
    <div className={classes(styles.container, className)}>
      <div className={styles.email}>
        {user.email || "colin.maher94@gmail.com"}
      </div>
    </div>
  );
};
