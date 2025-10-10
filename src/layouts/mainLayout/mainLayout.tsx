import { useLocation } from "wouter";

import { Children } from "types/general";
import { Button } from "components/button/button";
import { sections } from "constants/sections";
import { getCurrentRouteName } from "utils/getCurrentRouteName";
import { ButtonProps } from "components/button/types";

import styles from "./styles.module.scss";

interface Props {
  buttons?: ButtonProps[];
  children: Children;
}

export const MainLayout = (props: Props) => {
  const [location, navigate] = useLocation();

  const { children, buttons } = props;

  const id = getCurrentRouteName(location);
  const name = id ? sections[id].name : "";

  return (
    <div className={styles.container}>
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

        {buttons?.map((button) => (
          <Button {...button} />
        ))}
      </div>

      <div className={styles.content}>{children}</div>
    </div>
  );
};
