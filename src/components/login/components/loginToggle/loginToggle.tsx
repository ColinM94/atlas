import { classes } from "utils/classes";
import styles from "./styles.module.css";

interface Props {
  showSignIn: boolean;
  setShowSignIn: (showSignIn: boolean) => void;
  className?: string;
}

export const LoginToggle = (props: Props) => {
  const { showSignIn, setShowSignIn, className } = props;

  return (
    <div className={classes(styles.container, className)}>
      <div
        className={classes(
          styles.indicator,
          !showSignIn && styles.indicatorRight
        )}
      />

      <div onClick={() => setShowSignIn(true)} className={styles.button}>
        Sign In
      </div>

      <div onClick={() => setShowSignIn(false)} className={styles.button}>
        Sign Up
      </div>
    </div>
  );
};
