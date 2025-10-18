import { useLocation } from "wouter";

import { Children } from "types/general";
import { Button } from "components/button/button";
import { ButtonProps } from "components/button/types";
import { sections } from "constants/sections";
import { getCurrentRouteName } from "utils/getCurrentRouteName";
import { classes } from "utils/classes";

import styles from "./styles.module.scss";

interface Props {
  buttons?: ButtonProps[];
  children: Children;
  className?: string;
}

export const MainLayout = (props: Props) => {
  const [location, navigate] = useLocation();

  const { children, buttons, className } = props;

  const id = getCurrentRouteName(location);
  const name = id ? sections[id].name : "";

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        {name && (
          <div className={styles.header}>
            {location !== "/" && (
              <Button
                icon="arrow_back"
                type="secondary"
                onClick={() => void navigate("/")}
                layer={0}
                className={styles.backButton}
              />
            )}

            <div className={styles.heading}>{name}</div>

            <div className={styles.buttons}>
              {buttons?.map((button) => (
                <Button {...button} layer={0} />
              ))}
            </div>
          </div>
        )}

        <div className={classes(styles.content, className)}>{children}</div>
      </div>
    </div>
  );
};
