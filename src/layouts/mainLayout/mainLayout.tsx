import { useLocation } from "wouter";

import { Children } from "types/general";
import { Button } from "components/button/button";
import { ButtonProps } from "components/button/types";
import { classes } from "utils/classes";

import styles from "./styles.module.scss";

interface Props {
  label: string;
  buttons?: ButtonProps[];
  children: Children;
  className?: string;
}

export const MainLayout = (props: Props) => {
  const [location, navigate] = useLocation();

  const { children, buttons, className } = props;

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.header}>
          {location !== "/" && (
            <Button
              icon="arrow_back"
              type="secondary"
              onClick={() => history.back()}
              layer={0}
              className={styles.backButton}
            />
          )}

          <div className={styles.buttons}>
            {buttons?.map((button) => (
              <Button {...button} layer={0} />
            ))}
          </div>
        </div>

        <div className={classes(styles.content, className)}>{children}</div>
      </div>
    </div>
  );
};
